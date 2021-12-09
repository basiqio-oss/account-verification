import { useFormState } from 'react-use-form-state';
import { useAccountVerificationForm } from './AccountVerificationForm';
import { Button } from '../Button';
import { TextField } from '../TextField';

export function AccountVerificationFormStep0() {
  const { goForward } = useAccountVerificationForm();
  const [formState, { email }] = useFormState();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formState.values);
    goForward();
  }

  return (
    <>
      <div className="text-center">
        <h1>We need your email to get started</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <TextField {...email('email')} label="Email" required />
          <div className="space-y-2">
            <Button type="submit" variant="bold" block>
              Continue
            </Button>
            <Button type="button" variant="subtle" block>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
