import { useFormState } from 'react-use-form-state';
import { useAccountVerificationForm } from './AccountVerificationForm';
import { Button } from '../Button';

export function AccountVerificationFormStep1() {
  const { goForward } = useAccountVerificationForm();
  const [formState, { email }] = useFormState();

  return (
    <div>
      <div className="text-center space-y-6">
        <h1>Let’s connect your bank account</h1>
        <p>We need to verify the details of the account to deduct the nominated regular fee from.</p>
        <ul>
          <li>Bank grade 256-bit SSL encryption</li>
          <li>We never save your bank login credentials in the app</li>
          <li>We can not transact on your behalf</li>
        </ul>
      </div>
      <div className="space-y-2">
        <Button variant="bold" block onClick={goForward}>
          Continue
        </Button>
        <Button variant="subtle" block>
          Learn more
        </Button>
      </div>
    </div>
  );
}
