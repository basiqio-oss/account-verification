import { useFormState } from 'react-use-form-state';
import { useAccountVerificationForm } from './AccountVerificationForm';
import { Button } from '../Button';

export function AccountVerificationFormStep3() {
  const { goForward } = useAccountVerificationForm();

  return (
    <div>
      <div className="text-center space-y-6">
        <h1>Bank login</h1>
        <Button onClick={goForward}>Continue</Button>
      </div>
    </div>
  );
}
