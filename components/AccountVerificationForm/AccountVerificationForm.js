import { useState, createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import { ProgressBar } from '../ProgressBar';
import { AccountVerificationFormCancellationModal } from './AccountVerificationFormCancellationModal';
import { AccountVerificationFormStep0 } from './AccountVerificationFormStep0';
import { AccountVerificationFormStep1 } from './AccountVerificationFormStep1';
import { AccountVerificationFormStep2 } from './AccountVerificationFormStep2';
import { AccountVerificationFormStep3 } from './AccountVerificationFormStep3';
import { AccountVerificationFormStep4 } from './AccountVerificationFormStep4';

const FORM_COMPONENTS = [
  AccountVerificationFormStep0,
  AccountVerificationFormStep1,
  AccountVerificationFormStep2,
  AccountVerificationFormStep3,
  AccountVerificationFormStep4,
];

const AccountVerificationFormContext = createContext({});
export const useAccountVerificationForm = () => useContext(AccountVerificationFormContext);

export function AccountVerificationForm() {
  const router = useRouter();

  const [accountVerificationFormState, setAccountVerificationFormState] = useState({});
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
  const confirmCancel = () => router.push('/');

  // Called when the user has successfully finished all seteps
  const finish = () => router.push('/');

  const contextValue = {
    currentStep,
    totalSteps,
    goBack,
    goForward,
    cancel: openCancellationModal,
    finish,
    accountVerificationFormState,
    updateAccountVerificationFormState,
  };
  const FormComponent = FORM_COMPONENTS[currentStep];

  return (
    <AccountVerificationFormContext.Provider value={contextValue}>
      {/** Form progress indicators / Cancel control  */}
      <div className="fixed top-0 right-0 left-0">
        <ProgressBar value={Math.round(((currentStep + 1) / totalSteps) * 100)} />
      </div>
      <div className="absolute flex justify-between px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 md:fixed w-full">
        <span className="text-xs sm:text-sm text-gray-600">
          {currentStep + 1} of {totalSteps}
        </span>
        {/* TODO: change tabindex so Cancel doesn't get focused first */}
        {currentStep > 0 ? (
          <button
            className="text-xs sm:text-sm text-primary-600 rounded hover:text-opacity-90 active:text-opacity-75 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-30 ring-offset-1 ring-offset-transparent outline-none"
            onClick={openCancellationModal}
          >
            Cancel
          </button>
        ) : null}
      </div>

      {/** The UI of the form step */}
      <div className="min-h-screen flex flex-col mx-auto max-w-md px-4 sm:px-6 pt-6 sm:pt-8 pb-8">
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
