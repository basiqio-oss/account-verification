import { Button } from '../Button';
import { useAccountVerificationForm } from './AccountVerificationForm';

export function AccountVerificationFormStep1() {
  const { goForward } = useAccountVerificationForm();
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
        <Button as="a" href="https://basiq.io/" target="_blank" rel="noreferrer" variant="subtle" block>
          Learn more
        </Button>
      </div>
    </div>
  );
}
