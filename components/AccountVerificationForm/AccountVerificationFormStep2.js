import { useFormState } from 'react-use-form-state';
import { useAccountVerificationForm } from './AccountVerificationForm';
import { TextField } from '../TextField';

export function AccountVerificationFormStep2() {
  const { goForward } = useAccountVerificationForm();
  const [formState, { email }] = useFormState();

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ formState });
    goForward();
  }

  return (
    <div>
      <div className="text-center space-y-6">
        <h1>Find your bank</h1>
      </div>
      <TextField label="Search" />
    </div>
  );
}
