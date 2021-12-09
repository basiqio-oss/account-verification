import { Button } from '../Button';

export function AccountVerificationFormSuccess() {
  return (
    <div>
      <div className="text-center space-y-6">
        <h1>You&apos;re all set</h1>
        <p>We have verified the details of the bank account below, and you’re good to go.</p>
      </div>
      <p>You can manage your bank connections in the app settings later.</p>
      <Button variant="bold" block>
        Finish
      </Button>
    </div>
  );
}
