import { useEffect } from 'react';
import { useTernaryState } from '../../utils/useTernaryState';
import { ProgressBar } from '../ProgressBar';
import { AccountVerificationFormStep0SignUp } from './AccountVerificationFormStep0SignUp';
import { AccountVerificationFormStep1PreConsent } from './AccountVerificationFormStep1PreConsent';
import { AccountVerificationFormStep2InstitutionPicker } from './AccountVerificationFormStep2InstitutionPicker';
import { AccountVerificationFormStep3InstitutionLogin } from './AccountVerificationFormStep3InstitutionLogin';
import { AccountVerificationFormStep4SelectAccount } from './AccountVerificationFormStep4SelectAccount';
import { AccountVerificationFormStep5Summary } from './AccountVerificationFormStep5Summary';
import { useAccountVerificationForm } from './AccountVerificationFormProvider';
import { AccountVerificationFormCancellationModal } from './AccountVerificationFormCancellationModal';

export const FORM_COMPONENTS = [
  AccountVerificationFormStep0SignUp,
  AccountVerificationFormStep1PreConsent,
  AccountVerificationFormStep2InstitutionPicker,
  AccountVerificationFormStep3InstitutionLogin,
  AccountVerificationFormStep4SelectAccount,
  AccountVerificationFormStep5Summary,
];

export function AccountVerificationForm() {
  const { currentStep, totalSteps, cancel, cancelling, goBack, goForward } = useAccountVerificationForm();
  const Component = FORM_COMPONENTS[currentStep];

  // State for managing hiding/showing of the cancellation model
  const [isCancellationModalOpen, openCancellationModal, closeCancellationModal] = useTernaryState(false);

  // When the user changes steps, scroll to the top of the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  return (
    <>
      {/* PROGRESS BAR */}
      {/* Delightful indication of the progress the user has made, to be 
      displayed in conjunction with a Step Count */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <ProgressBar value={Math.round(((currentStep + 1) / totalSteps) * 100)} />
        {/* Fade to blend form content nicely when scrolling down the page */}
        <div className="block h-4 bg-gradient-to-b from-white" />
      </div>

      {/* STEP COUNT */}
      {/* Helps the user feel like they have an overview of their progress, 
      indicating how long it's going to take, and how many steps are left. */}
      <div className="absolute left-0 px-4 pt-6 sm:px-6 md:px-8 sm:pt-8 md:fixed">
        <span className="text-xs sm:text-sm text-neutral-muted-darker">
          <span data-cy="current-step">{currentStep + 1}</span> of {totalSteps}
        </span>
      </div>

      {/* CANCEL BANK CONNECTION */}
      {/* Important to not lock the user in. They should be able to regret 
      their decision to connect with a bank at any point. */}
      <div className="absolute right-0 px-4 pt-6 sm:px-6 md:px-8 sm:pt-8 md:fixed">
        {/* Show Cancel button unless the user is on the first or last step */}
        {currentStep > 0 && currentStep !== totalSteps - 1 ? (
          // TODO: change tabindex so Cancel doesn't get focused first
          <button
            className="text-xs rounded outline-none sm:text-sm text-primary-bold-darker hover:text-opacity-90 active:text-opacity-75 focus:ring-2 focus:ring-primary-bold focus:ring-opacity-30 ring-offset-1 ring-offset-transparent"
            onClick={openCancellationModal}
          >
            Cancel
          </button>
        ) : null}
      </div>

      <div className="flex flex-col max-w-md min-h-screen px-4 pt-6 pb-6 mx-auto sm:px-6 sm:pt-8">
        <Component />
      </div>

      {/** Cancellation modal */}
      <AccountVerificationFormCancellationModal
        isOpen={isCancellationModalOpen}
        onClose={closeCancellationModal}
        onConfirm={cancel}
        cancelling={cancelling}
      />

      {/** Debugging */}
      {process.env.NODE_ENV !== 'production' && (
        <div className="bottom-0 left-0 text-sm sm:fixed space-x-6 text-neutral-dim-darker">
          <button onClick={goBack}>Prev</button>
          <button onClick={goForward}>Next</button>
        </div>
      )}
    </>
  );
}
