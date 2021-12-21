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
  // TODO: resetState
});
export const useAccountVerificationForm = () => useContext(AccountVerificationFormContext);

export function AccountVerificationFormProvider({ children }) {
  const router = useRouter();

  const [accountVerificationFormState, setAccountVerificationFormState] = useState({
    user: undefined,
    selectedInstitution: undefined,
    selectedAccount: undefined,
  });
  const updateAccountVerificationFormState = newState => {
    setAccountVerificationFormState(oldState => ({ ...oldState, ...newState }));
  };

  // State for managing which step of the form to display
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = FORM_COMPONENTS.length;
  const goBack = () => setCurrentStep(step => (step === 0 ? 0 : step - 1));
  const goForward = () => setCurrentStep(step => (step === totalSteps - 1 ? totalSteps - 1 : currentStep + 1));

  // TODO: What do we need to do in terms of API here, ie delete user, stop job polling, remove any connection etc?
  const cancel = () => router.push('/');

  // Called when the user has successfully finished all seteps
  const finish = () => router.push('/');

  const { createBasiqConnection, basiqConnection } = useBasiqConnection({
    userId: accountVerificationFormState.user?.id,
    currentStep,
  });

  const contextValue = {
    currentStep,
    totalSteps,
    goBack,
    goForward,
    cancel,
    finish,
    accountVerificationFormState,
    updateAccountVerificationFormState,
    createBasiqConnection,
    basiqConnection,
  };

  return (
    <AccountVerificationFormContext.Provider value={contextValue}>{children}</AccountVerificationFormContext.Provider>
  );
}

function useBasiqConnection({ userId, currentStep }) {
  const token = useClientToken();

  const [jobId, setJobId] = useState();
  const [progress, setProgress] = useState();
  const [error, setError] = useState();
  const [stepNameInProgress, setStepNameInProgress] = useState();

  async function createBasiqConnection(data) {
    if (!userId || !token) return;
    const jobId = await createConnection({ data, token, userId });
    setJobId(jobId);
  }

  // Everytime the user changes steps, make sure these values get reset
  useEffect(() => {
    setJobId(undefined);
    setProgress(undefined);
    setError(undefined);
  }, [currentStep]);

  // If we have a basiq connection, check the status every 2 seconds
  useEffect(() => {
    if (!token || !jobId || !userId) return;
    setProgress(0);

    // Immediately check the status of the job
    checkJobStatus();

    // Check the status of the job every 2 seconds
    const timer = setTimeout(checkJobStatus, 2000);

    async function checkJobStatus() {
      try {
        const response = await checkConnectionStatus({ token, jobId });

        // In this demo, we only care about the "verify-credentials" and "retrieve-accounts" steps
        // Once these steps have been completed, we navigate the user to the next step in the form
        const steps = response.data.steps.filter(
          ({ title }) => title === 'verify-credentials' || title === 'retrieve-accounts'
        );

        // Since we know we only have 2 steps, each step in 'success' can be 50% and each step 'in_progress' can be '25%'
        const progress = 0;
        for (const step of steps) {
          switch (step.status) {
            case 'in_progress':
              setStepNameInProgress(step.title);
              progress += 25;
            case 'success':
              progress += 50;
              break;
            case 'failed':
              setError(newStepError(step.result));
              progress += 50;
          }
        }

        setProgress(progress);
      } catch (error) {
        setError(error);
      }
    }

    return () => {
      clearTimeout(timer);
    };
  }, [jobId, token, userId]);

  return {
    createBasiqConnection,
    basiqConnection: jobId
      ? {
          progress,
          stepNameInProgress,
          error,
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
