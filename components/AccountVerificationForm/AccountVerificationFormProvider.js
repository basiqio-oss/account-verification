import { useEffect, useState, createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { FORM_COMPONENTS } from './AccountVerificationForm';

const AccountVerificationFormContext = createContext({
  // The current step number of the form the user on
  currentStep: undefined,
  // The total amount of steps in the form
  totalSteps: undefined,
  // Function to navigate the user to the previous step
  goBack: undefined,
  // Function to navigate the user to the next step
  goForward: undefined,
  // Function to cancel the the users verification. A confirmation modal will be triggered.
  cancel: undefined,
  // If true, the cancellation process is in progress
  cancelling: undefined,
  // Function to call when the user has completed the form
  finish: undefined,
  // The state of the verification form, this is used to pass values between multiple steps
  accountVerificationFormState: undefined,
  // Function to update the verification form state
  updateAccountVerificationFormState: undefined,
  // Function to create a secure connection to the basiq API.
  createBasiqConnection: undefined,
  // The state of the secure connection to the basiq API
  basiqConnection: undefined,
  // Function to reset the state of the form
  reset: undefined,
});
export const useAccountVerificationForm = () => useContext(AccountVerificationFormContext);

const initialAccountVerificationFormState = {
  user: undefined,
  selectedInstitution: undefined,
  selectedAccount: undefined,
};

export function AccountVerificationFormProvider({ children }) {
  const router = useRouter();

  const [accountVerificationFormState, setAccountVerificationFormState] = useState(initialAccountVerificationFormState);
  const updateAccountVerificationFormState = newState => {
    setAccountVerificationFormState(oldState => ({ ...oldState, ...newState }));
  };

  // State for managing which step of the form to display
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = FORM_COMPONENTS.length;
  const goBack = () => setCurrentStep(step => (step === 0 ? 0 : step - 1));
  const goForward = () => setCurrentStep(step => (step === totalSteps - 1 ? totalSteps - 1 : currentStep + 1));

  const { createBasiqConnection, basiqConnection, deleteBasiqConnection } = useBasiqConnection({
    userId: accountVerificationFormState.user?.id,
    selectedInstitution: accountVerificationFormState.selectedInstitution.currentStep,
  });

  function resetState() {
    setAccountVerificationFormState(initialAccountVerificationFormState);
    setCurrentStep(0);
    setCancelling(false);
  }

  // State for managing cancelling the account verification form
  const [cancelling, setCancelling] = useState(false);
  async function cancel() {
    // Cancelling at the first step doesn't require a confirmation modal as the user has not submitted any form data yet
    if (currentStep === 0) {
      router.push('/');
      return;
    }
    setCancelling(true);
    try {
      await deleteBasiqConnection();
      router.push('/');
      resetState();
    } catch {
      // If something went wrong while deleting the basiq connection, we send the user to the home page via a full page refresh so all state is reset
      window.location = window.location.origin;
    }
  }

  // Called when the user has successfully finished all steps
  const finish = () => router.push('/');

  const contextValue = {
    currentStep,
    totalSteps,
    goBack,
    goForward,
    cancel,
    cancelling,
    finish,
    accountVerificationFormState,
    updateAccountVerificationFormState,
    createBasiqConnection,
    basiqConnection,
    reset: resetState,
  };

  return (
    <AccountVerificationFormContext.Provider value={contextValue}>{children}</AccountVerificationFormContext.Provider>
  );
}

function useBasiqConnection({ userId, currentStep, selectedInstitution }) {
  const { asPath } = useRouter();
  const token = useClientToken();

  const [jobId, setJobId] = useState();
  const [progress, setProgress] = useState();
  const [error, setError] = useState();
  const [stepNameInProgress, setStepNameInProgress] = useState();

  // The estimated time job is expected time to take (in milliseconds)
  // For this demo, we only care about the "verify-credentials" and "retrieve-accounts" step
  const estimatedTime = selectedInstitution
    ? selectedInstitution.stats.averageDurationMs.verifyCredentials +
      selectedInstitution.stats.averageDurationMs.retrieveAccounts
    : undefined;

  const completed = !error && progress === 100;

  async function createBasiqConnection(data) {
    if (!userId || !token) return;
    const jobId = await createConnection({ data, token, userId });
    setJobId(jobId);
  }

  async function deleteBasiqConnection() {
    if (!jobId || !userId || !token) return;
    await deleteConnection({ token, jobId, userId });
  }

  // Everytime the user changes steps, make sure these values get reset
  useEffect(() => {
    setJobId(undefined);
    setProgress(undefined);
    setError(undefined);
  }, [currentStep]);

  // If we have a basiq connection, check the status every 2 seconds
  useEffect(() => {
    // We can't start a job without this information
    if (!token || !jobId || !userId) return;
    // If a job was started, but an error occurred or it's finished, we can stop polling
    if (error || completed) return;

    setProgress(0);
    setStepNameInProgress('verify-credentials');

    // Immediately check the status of the job
    checkJobStatus();

    // Check the status of the job every 2 seconds
    const timer = setInterval(checkJobStatus, 2000);

    async function checkJobStatus() {
      try {
        const response = await checkConnectionStatus({ token, jobId });

        // In this demo, we only care about the "verify-credentials" and "retrieve-accounts" steps
        // Once these steps have been completed, we navigate the user to the next step in the form
        const steps = response.data.steps.filter(
          ({ title }) => title === 'verify-credentials' || title === 'retrieve-accounts'
        );

        // Since we know we only have 2 steps, each step in 'success' can be 50% and each step 'in-progress' can be '25%'
        const progress = 0;
        for (const step of steps) {
          switch (step.status) {
            case 'pending':
              progress += 10;
              break;
            case 'in-progress':
              setStepNameInProgress(step.title);
              progress += 30;
              break;
            case 'success':
              progress += 50;
              break;
            case 'failed':
              setError(newStepError(step.result));
              progress += 50;
              break;
          }
        }

        setProgress(progress);
      } catch (error) {
        setError(error);
      }
    }

    return () => {
      clearInterval(timer);
    };
  }, [jobId, token, userId, asPath, error, completed]);

  // If the user has decided to exit and resume process in background we will
  // trigger a toast when the job finishes processing or an error occurres
  useEffect(() => {
    if (asPath === '/account-verification') return;
    if (error) {
      console.log('TRIGGER ERROR TOAST', error.message, error.name);
      return;
    }
    if (completed) {
      console.log('TRIGGER SUCCESS TOAST');
      return;
    }
  }, [asPath, completed, error]);

  return {
    createBasiqConnection,
    deleteBasiqConnection,
    basiqConnection: jobId
      ? {
          estimatedTime,
          progress,
          stepNameInProgress,
          error,
          completed,
        }
      : undefined,
  };
}

function newStepError({ detail, title }) {
  const error = new Error();
  error.message = detail;
  error.name = title;
  return error;
}

// Creates a new connection with the Basiq API
// IMPORTANT: Under no circumstance should you store your customers credentials anywhere in your application
// https://api.basiq.io/reference/create-a-connection
// https://api.basiq.io/reference/jobs
async function createConnection({ token, userId, data }) {
  const response = await axios.post(`https://au-api.basiq.io/users/${userId}/connections`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return response.data.id;
}

// Permanently deletes a connection with the Basiq API
// Once the connection has been deleted, all of the associated financial data e.g. accounts and transactions can still be accessed via the users end-point
// https://api.basiq.io/reference/delete-a-connection
async function deleteConnection({ token, userId, jobId }) {
  const response = await axios.delete(`https://au-api.basiq.io/users/${userId}/connections/${jobId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return response.data.id;
}

// Retrieves the details of the connection
// https://api.basiq.io/reference/retrieve-a-job
async function checkConnectionStatus({ token, jobId }) {
  const response = await axios.get(`https://au-api.basiq.io/jobs/${jobId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return response;
}

function useClientToken() {
  const [token, setToken] = useState();

  useEffect(() => {
    axios.get('/api/client-token').then(response => setToken(response.data));
  }, []);

  return token;
}
