import { useState, createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import { ProgressBar } from '../ProgressBar';
import { AccountVerificationFormCancellationModal } from './AccountVerificationFormCancellationModal';
import { AccountVerificationFormStep0 } from './AccountVerificationFormStep0-SignUp';
import { AccountVerificationFormStep1 } from './AccountVerificationFormStep1-PreConsent';
import { AccountVerificationFormStep2 } from './AccountVerificationFormStep2-InstitutionPicker';
import { AccountVerificationFormStep3 } from './AccountVerificationFormStep3-InstitutionLogin';
import { AccountVerificationFormStep4 } from './AccountVerificationFormStep4-SelectAccount';

const FORM_COMPONENTS = [
  AccountVerificationFormStep0, // SignUp
  AccountVerificationFormStep1, // PreConsent
  AccountVerificationFormStep2, // InstitutionPicker
  AccountVerificationFormStep3, // InstitutionLogin
  AccountVerificationFormStep4, // SelectAccount
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
  // TODO: What do we need to do in terms of API here, ie delete user, stop job polling, remove any connection etc?
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
      {/* PROGRESS BAR */}
      {/* Delightful indication of the progress the user has made, to be 
      displayed in conjunction with a Step Count */}
      <ProgressBar value={Math.round(((currentStep + 1) / totalSteps) * 100)} />

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
