import Image from 'next/image';
import { useFormState } from 'react-use-form-state';
import { Button } from '../Button';
import { TextField } from '../TextField';
import { useAccountVerificationForm } from './AccountVerificationForm';

export function AccountVerificationFormStep0() {
  const { goForward, cancel } = useAccountVerificationForm();
  const [formState, { email }] = useFormState();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formState.values);
    goForward();
  }

  return (
    <div className="flex flex-col flex-grow space-y-6 sm:space-y-8">
      {/* Logo */}
      {/* This helps the user keep context. */}
      <div className="flex justify-center">
        <div className="w-12 h-12 sm:w-16 sm:h-16 relative">
          <Image src="/logo-on-white.svg" alt="Piper logo" layout="fill" />
        </div>
      </div>

      {/* Form content */}
      <div className="flex flex-col flex-grow justify-center space-y-6 sm:space-y-8">
        {/* Step header */}
        {/* A short as possible heading. TODO: Write more */}
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-center">
          We need your email
          <br />
          to get started
        </h1>

        {/* Form */}
        {/* TODO: Write more */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 sm:space-y-8">
            <TextField {...email('email')} id="email" label="Email" placeholder="your@email.com" required />

            {/* Terms and Conditions */}
            {/* TODO: Write more */}
            <p className="text-xs text-gray-600 text-center max-w-xs mx-auto leading-relaxed">
              By continuing you agree to the Terms and Conditions and our Privacy Policy.
            </p>

            <div className="space-y-2">
              <Button type="submit" variant="bold" block>
                Continue
              </Button>
              <Button type="button" variant="subtle" block onClick={cancel}>
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
