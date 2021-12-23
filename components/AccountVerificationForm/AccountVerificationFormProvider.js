import { useToasts } from 'react-toast-notifications';
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
  // Function to be called when the user has successfully finished all steps
  hasCompletedForm: undefined,
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
  const [hasCompletedForm, setHasCompletedForm] = useState(false);

  // State for managing which step of the form to display
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = FORM_COMPONENTS.length;
  const goBack = () => setCurrentStep(step => (step === 0 ? 0 : step - 1));
  const goForward = () => setCurrentStep(step => (step === totalSteps - 1 ? totalSteps - 1 : currentStep + 1));

  // State for managing the basiq connection
  const { createBasiqConnection, basiqConnection, deleteBasiqConnection } = useBasiqConnection({
    userId: accountVerificationFormState.user?.id,
    selectedInstitution: accountVerificationFormState.selectedInstitution,
  });

  function resetState() {
    setAccountVerificationFormState(initialAccountVerificationFormState);
    setCurrentStep(0);
    setCancelling(false);
    setHasCompletedForm(false);
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
  function finish() {
    setHasCompletedForm(true);
    router.push('/');
  }

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
    hasCompletedForm,
  };

  return (
    <AccountVerificationFormContext.Provider value={contextValue}>{children}</AccountVerificationFormContext.Provider>
  );
}

function useBasiqConnection({ userId, currentStep, selectedInstitution }) {
  const { addToast } = useToasts();
  const { asPath } = useRouter();
  const token = useClientToken();

  const [jobId, setJobId] = useState();
  const [inProgress, setInProgress] = useState(false);
  const [estimatedProgress, setEstimatedProgress] = useState();
  const [stepNameInProgress, setStepNameInProgress] = useState();
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState();

  function resetState() {
    setJobId(undefined);
    setInProgress(false);
    setEstimatedProgress(undefined);
    setStepNameInProgress(undefined);
    setCompleted(false);
    setError(undefined);
  }

  // Reset our state anytime the current step changes
  useEffect(() => {
    resetState();
  }, [currentStep]);

  // The estimated time job is expected time to take (in milliseconds)
  // For this demo, we only care about the "verify-credentials" and "retrieve-accounts" step
  const estimatedTime = selectedInstitution
    ? selectedInstitution.stats.averageDurationMs.verifyCredentials +
      selectedInstitution.stats.averageDurationMs.retrieveAccounts
    : undefined;

  async function createBasiqConnection(data) {
    if (!userId || !token) return;

    setInProgress(true);
    // Optimisic UI. We know the first job basiq will process will always be "verify-credentials"
    setStepNameInProgress('verify-credentials');

    const jobId = await createConnection({ data, token, userId });
    setJobId(jobId);
  }

  async function deleteBasiqConnection() {
    if (!jobId || !userId || !token) return;
    await deleteConnection({ token, jobId, userId });
  }

  // If we have a basiq connection, check the status every 2 seconds
  useEffect(() => {
    // We can't start a job without this information
    if (!token || !jobId || !userId) return;
    // If a job was started, but an error occurred or it's finished, we can stop polling
    if (error || completed) return;

    // Immediately check the status of the job
    checkJobStatus();

    // Check the status of the job every 2 seconds
    const timer = setInterval(checkJobStatus, 2000);

    async function checkJobStatus() {
      try {
        const response = await checkConnectionStatus({ token, jobId });

        // In this demo, we only care about the "verify-credentials" and "retrieve-accounts" steps
        const steps = response.data.steps.filter(
          ({ title }) => title === 'verify-credentials' || title === 'retrieve-accounts'
        );

        // Check which step are in progress or have errored
        for (const step of steps) {
          if (step.status === 'in-progress') {
            setStepNameInProgress(step.title);
          }
          if (step.status === 'failed') {
            setError(newStepError(step.result));
          }
        }

        // Check if all steps have been completed
        const completed = steps.every(step => step.status === 'success');
        setCompleted(completed);
        setInProgress(!completed);
        if (completed) setEstimatedProgress(100);
      } catch (error) {
        setError(error);
      }
    }

    return () => {
      clearInterval(timer);
    };
  }, [completed, error, jobId, token, userId]);

  // We want the job polling experience to be an engaging experience for the user
  // So here we use the estimated job time to calculate the progress
  useEffect(() => {
    if (!inProgress) return;
    const start = Date.now();
    const timer = setInterval(checkEstimatedProgress, 500);

    function checkEstimatedProgress() {
      const progress = Math.round(((Date.now() - start) / estimatedTime) * 100);
      if (progress >= 100) {
        clearInterval(timer);
        return;
      }
      setEstimatedProgress(progress);
    }

    return () => {
      clearInterval(timer);
    };
  }, [inProgress, estimatedTime]);

  // If the job is taking longer than the estimated progress, we will show 95% until the job is raedy
  const progress = inProgress && estimatedProgress >= 95 ? 95 : estimatedProgress;

  // If the user has decided to exit and resume process in background we will
  // trigger a toast when the job finishes processing or an error occurres
  useEffect(() => {
    if (!jobId) return; // Make sure we only trigger the toast when you're on the step 3
    if (asPath === '/account-verification') return;
    if (error) {
      addToast(error.message, {
        title: error.name,
        appearance: 'success',
      });
      return;
    }
    if (completed) {
      addToast('Please continue setup, and select an account to finish.', {
        title: 'Bank connected',
        appearance: 'success',
      });
      return;
    }
  }, [jobId, addToast, asPath, completed, error]);

  return {
    basiqConnection: {
      inProgress,
      progress,
      stepNameInProgress,
      estimatedTime,
      error,
      completed,
      reset: resetState,
    },
    createBasiqConnection,
    deleteBasiqConnection,
  };
}

// The reason for attatching these properties to the error object is because we will use
// thes e properties to display information about the error in `AccountVerificationFormStep3InstitutionLogin`
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
