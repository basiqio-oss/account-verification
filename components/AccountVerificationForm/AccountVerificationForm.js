import { useState, createContext, useContext } from 'react';
import { ProgressBar } from '../ProgressBar';
import { AccountVerificationFormStep0 } from './AccountVerificationFormStep0';
import { AccountVerificationFormStep1 } from './AccountVerificationFormStep1';
import { AccountVerificationFormStep2 } from './AccountVerificationFormStep2';
import { AccountVerificationFormStep3 } from './AccountVerificationFormStep3';
import { AccountVerificationFormStep4 } from './AccountVerificationFormStep4';

const AccountVerificationFormContext = createContext({});

export const useAccountVerificationForm = () => useContext(AccountVerificationFormContext);

const COMPONENTS = [
  AccountVerificationFormStep0,
  AccountVerificationFormStep1,
  AccountVerificationFormStep2,
  AccountVerificationFormStep3,
  AccountVerificationFormStep4,
];

export function AccountVerificationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = COMPONENTS.length;

  const goBack = () => {
    setCurrentStep(currentStep => {
      return currentStep === 0 ? 0 : currentStep - 1;
    });
  };

  const goForward = () => {
    setCurrentStep(currentStep => {
      return currentStep === totalSteps - 1 ? totalSteps - 1 : currentStep + 1;
    });
  };

  const contextValue = { currentStep, totalSteps, goBack, goForward };

  const Component = COMPONENTS[currentStep];

  return (
    <AccountVerificationFormContext.Provider value={contextValue}>
      <div className="absolute top-0 right-0 left-0 space-y-4">
        <ProgressBar value={Math.round(((currentStep + 1) / totalSteps) * 100)} />
        <div className="flex justify-between px-4">
          <span>
            Step {currentStep + 1} of {totalSteps}
          </span>
          <button onClick={goForward}>Next (dev)</button>
          {currentStep > 0 ? <button className="text-brand-500">Cancel</button> : null}
        </div>
      </div>
      <div className="min-h-screen flex flex-col justify-center mx-auto max-w-md py-2">
        <div className="space-y-8">
          <div className="text-center">Company logo</div>
          <Component />
        </div>
      </div>
    </AccountVerificationFormContext.Provider>
  );
}
