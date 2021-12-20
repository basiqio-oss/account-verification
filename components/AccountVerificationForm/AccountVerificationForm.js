import { useEffect, useState, createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ProgressBar } from '../ProgressBar';
import { AccountVerificationFormCancellationModal } from './AccountVerificationFormCancellationModal';
import { AccountVerificationFormStep0SignUp } from './AccountVerificationFormStep0SignUp';
import { AccountVerificationFormStep1PreConsent } from './AccountVerificationFormStep1PreConsent';
import { AccountVerificationFormStep2InstitutionPicker } from './AccountVerificationFormStep2InstitutionPicker';
import { AccountVerificationFormStep3InstitutionLogin } from './AccountVerificationFormStep3InstitutionLogin';
import { AccountVerificationFormStep4SelectAccount } from './AccountVerificationFormStep4SelectAccount';
import { AccountVerificationFormStep5Summary } from './AccountVerificationFormStep5Summary';

const FORM_COMPONENTS = [
  AccountVerificationFormStep0SignUp,
  AccountVerificationFormStep1PreConsent,
  AccountVerificationFormStep2InstitutionPicker,
  AccountVerificationFormStep3InstitutionLogin,
  AccountVerificationFormStep4SelectAccount,
  AccountVerificationFormStep5Summary,
];

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
});
export const useAccountVerificationForm = () => useContext(AccountVerificationFormContext);

export function AccountVerificationForm() {
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

  // State for managing hiding/showing of the cancellation model
  const [isCancellationModalOpen, setCancellationModalOpen] = useState(false);
  const openCancellationModal = () => setCancellationModalOpen(true);
  const closeCancellationModal = () => setCancellationModalOpen(false);
  // TODO: What do we need to do in terms of API here, ie delete user, stop job polling, remove any connection etc?
  const confirmCancel = () => router.push('/');

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
    cancel: openCancellationModal,
    finish,
    accountVerificationFormState,
    updateAccountVerificationFormState,
    createBasiqConnection,
    basiqConnection,
  };
  const FormComponent = FORM_COMPONENTS[currentStep];

  return (
    <AccountVerificationFormContext.Provider value={contextValue}>
      {/* PROGRESS BAR */}
      {/* Delightful indication of the progress the user has made, to be 
      displayed in conjunction with a Step Count */}
      <div className="fixed top-0 right-0 left-0 z-10">
        <ProgressBar value={Math.round(((currentStep + 1) / totalSteps) * 100)} />
        {/* Fade to blend form content nicely when scrolling down the page */}
        <div className="bg-gradient-to-b from-white to-transparent h-4 block" />
      </div>

      {/* STEP COUNT */}
      {/* Helps the user feel like they have an overview of their progress, 
      indicating how long it's going to take, and how many steps are left. */}
      <div className="absolute left-0 px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 md:fixed">
        <span className="text-xs sm:text-sm text-gray-600">
          {currentStep + 1} of {totalSteps}
        </span>
      </div>

      {/* CANCEL BANK CONNECTION */}
      {/* Important to not lock the user in. They should be able to regret 
      their decision to connect with a bank at any point. */}
      <div className="absolute right-0 px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 md:fixed">
        {/* Show Cancel button unless the user is on the first or last step */}
        {currentStep > 0 && currentStep !== totalSteps - 1 ? (
          // TODO: change tabindex so Cancel doesn't get focused first
          <button
            className="text-xs sm:text-sm text-primary-600 rounded hover:text-opacity-90 active:text-opacity-75 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-30 ring-offset-1 ring-offset-transparent outline-none"
            onClick={openCancellationModal}
          >
            Cancel
          </button>
        ) : null}
      </div>

      {/** The UI of the form step */}
      <div className="min-h-screen flex flex-col mx-auto max-w-md px-4 sm:px-6 pt-6 sm:pt-8 pb-16">
        <FormComponent />
      </div>

      {/** Cancellation modal */}
      <AccountVerificationFormCancellationModal
        isOpen={isCancellationModalOpen}
        onClose={closeCancellationModal}
        onConfirm={confirmCancel}
      />

      {/** Debugging */}
      <div className="sm:fixed bottom-6 left-6 space-x-6 text-sm text-gray-300">
        <button onClick={goBack}>Prev</button>
        <button onClick={goForward}>Next</button>
      </div>
    </AccountVerificationFormContext.Provider>
  );
}

function useBasiqConnection({ userId, currentStep }) {
  const token = useClientToken();

  const [jobId, setJobId] = useState();
  const [progress, setProgress] = useState();
  const [error, setError] = useState();

  async function createBasiqConnection() {
    if (!userId | !token) return;
    const jobId = await getJobId({ token, userId });
    setJobId(jobId);
  }

  // Everytime the user changes steps, make sure these values get reset
  useEffect(() => {
    setProgress(undefined);
    setError(undefined);
  }, [currentStep]);

  // If we have a basiq connection, check the status every 2 seconds
  useEffect(() => {
    if (!token || !jobId || !userId) return;
    setProgress(0);
    const timer = setTimeout(async () => {
      try {
        const response = await checkConnectionStatus({ token, jobId });

        // In this demo, we only care about the "verify-credentials" and "retrieve-accounts" steps
        // Once these steps have been completed, we can move to the user to the next step
        const steps = response.data.steps.filter(
          ({ title }) => title === 'verify-credentials' || title === 'retrieve-accounts'
        );

        // Since we know we only have 2 steps, each step in 'success' can be 50% and each step 'in_progress' can be '25%'
        const progress = 0;
        for (const step of steps) {
          switch (step.status) {
            case 'in_progress':
              progress += 25;
            case 'success':
              progress += 50;
              break;
          }
        }

        setProgress(progress);
      } catch (error) {
        setError(error);
      }
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [jobId, token, userId]);

  return {
    createBasiqConnection,
    basiqConnection: jobId ? { progress, error } : undefined,
  };
}

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

async function getJobId({ token, userId }) {
  // TODO these should come from the form, but used for testing atm
  var data = JSON.stringify({
    loginId: 'gavinBelson',
    password: 'hooli2016',
    institution: {
      id: 'AU00000',
    },
  });
  const response = await axios.post(`https://au-api.basiq.io/users/${userId}/connections`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return response.data.id;
}

function useClientToken() {
  const [token, setToken] = useState();

  useEffect(() => {
    axios.get('/api/client-token').then(response => setToken(response.data));
  }, []);

  return token;
}
