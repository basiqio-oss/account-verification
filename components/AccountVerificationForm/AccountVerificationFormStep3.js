import { useState } from 'react';
import Image from 'next/image';
import { useFormState } from 'react-use-form-state';
import { Button } from '../Button';
import { TextField } from '../TextField';
import { useAccountVerificationForm } from './AccountVerificationForm';

export function AccountVerificationFormStep3() {
  const { goForward, accountVerificationFormState } = useAccountVerificationForm();
  const [formState, { text, password }] = useFormState();
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const { selectedInstitution } = accountVerificationFormState;
  if (!selectedInstitution) return null;

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ formState });
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setErrorMessage('Something went wrong');
      goForward();
    }, 1000);
  }

  return (
    <div>
      <div className="text-center space-y-6">
        <h1>Bank login</h1>
        <div className="flex flex-col items-center space-y-2">
          <Image
            width={40}
            height={40}
            layout="fixed"
            src={selectedInstitution.logo.links.square}
            alt={`Logo of ${selectedInstitution.name}`}
          />
          <span>
            {selectedInstitution.name} {selectedInstitution.serviceName}
          </span>
        </div>
      </div>
      <div>
        {/* Form */}
        {/* TODO: Write more */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 sm:space-y-8">
            <TextField {...text('username')} id="username" label={selectedInstitution.loginIdCaption} required />
            <TextField {...password('password')} id="password" label={selectedInstitution.passwordCaption} required />
            <Button type="submit" loading={submitting} variant="bold" block>
              Continue
            </Button>
            {/** Error state */}
            {errorMessage && (
              <div className="bg-red-100 text-red-500 p-5">
                <span>{errorMessage}</span>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
