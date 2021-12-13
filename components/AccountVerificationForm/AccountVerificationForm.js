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

  const contextValue = { currentStep, totalSteps, goBack, goForward, cancel: openCancellationModal, finish };
  const FormComponent = FORM_COMPONENTS[currentStep];

  return (
    <AccountVerificationFormContext.Provider value={contextValue}>
      {/** Header (progress bar / controls)  */}
      <div className="absolute top-0 right-0 left-0 space-y-4">
        <ProgressBar value={Math.round(((currentStep + 1) / totalSteps) * 100)} />
        <div className="flex items-center justify-between px-4">
          <span>
            Step {currentStep + 1} of {totalSteps}
          </span>
          {currentStep > 0 ? (
            <button className="text-brand-500" onClick={openCancellationModal}>
              Cancel
            </button>
          ) : null}
        </div>
      </div>
      {/** The UI of the form step */}
      <div className="min-h-screen flex flex-col justify-center mx-auto max-w-md px-4 py-2">
        <FormComponent />
      </div>
      {/** Cancellation modal */}
      <AccountVerificationFormCancellationModal
        isOpen={isCancellationModalOpen}
        onClose={closeCancellationModal}
        onConfirm={confirmCancel}
      />
      {/** Debugging */}
      <div className="absolute bottom-4 left-4 space-x-4">
        <button onClick={goBack}>Prev</button>
        <button onClick={goForward}>Next</button>
      </div>
    </AccountVerificationFormContext.Provider>
  );
}
