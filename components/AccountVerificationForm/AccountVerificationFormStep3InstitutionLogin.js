import { useState } from 'react';
import { useFormState } from 'react-use-form-state';
import { Button } from '../Button';
import { TextField } from '../TextField';
import { useAccountVerificationForm } from './AccountVerificationForm';
import { StepLogo } from './StepLogo';
import { StepHeading } from './StepHeading';
import { StepDescription } from './StepDescription';

export function AccountVerificationFormStep3InstitutionLogin() {
  const { goForward, goBack, accountVerificationFormState } = useAccountVerificationForm();
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
    <div className="flex flex-col flex-grow space-y-6 sm:space-y-8">
      {/* STEP LOGO */}
      {/* To help the user keep context of what product they're using, */}
      {/* and what bank they're about to connect to. */}
      <StepLogo src={selectedInstitution.logo.links.square} alt={`Logo of ${selectedInstitution.name}`} />

      {/* STEP CONTENT */}
      <div className="flex flex-col flex-grow justify-center space-y-6 sm:space-y-8">
        <div className="space-y-3">
          {/* STEP HEADING */}
          {/* A short as possible heading to help the user quickly recognise the task at hand. */}
          <StepHeading>{selectedInstitution.shortName}</StepHeading>

          {/* STEP DESCRIPTION */}
          <StepDescription>
            Safely connect to {selectedInstitution.name} using your {selectedInstitution.serviceName} credentials.
          </StepDescription>
        </div>

        {/* CREDENTIALS FORM */}
        {/* TODO: Write more */}
        <div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6 sm:space-y-8">
              {/* TODO: 
              The best way to approach this is to look for attributes with the "Caption" suffix to know what to render
              Pass these additional login parameters as optional arguments when you create any connection. 
              
              Can we map over all the attributes ending in Caption for a neater solution? */}
              {/* Login ID */}
              <TextField
                {...text(`${selectedInstitution.loginIdCaption}`)}
                id={selectedInstitution.loginIdCaption}
                label={selectedInstitution.loginIdCaption}
                placeholder={selectedInstitution.loginIdCaption}
                required
              />

              {/* securityCodeCaption (if exists, St George Bank e.g.) */}
              {selectedInstitution.securityCodeCaption && (
                <TextField
                  {...text(`${selectedInstitution.securityCodeCaption}`)}
                  id={selectedInstitution.securityCodeCaption}
                  label={selectedInstitution.securityCodeCaption}
                  placeholder={selectedInstitution.securityCodeCaption}
                  required
                />
              )}

              {/* Password */}
              <div className="space-y-2">
                <TextField
                  {...password(`${selectedInstitution.passwordCaption}`)}
                  id={selectedInstitution.passwordCaption}
                  label={selectedInstitution.passwordCaption}
                  placeholder={selectedInstitution.passwordCaption}
                  required
                />

                {/* Forgotten password */}
                <a
                  href={selectedInstitution.forgottenPasswordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs text-primary-bolddarker underline rounded hover:text-opacity-90 active:text-opacity-75 focus:ring-2 focus:ring-primary-bold focus:ring-opacity-30 ring-offset-1 ring-offset-transparent outline-none"
                >
                  Forgot password?
                </a>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button type="submit" loading={submitting} variant="bold" block>
                  Connect
                </Button>
                <Button type="button" variant="subtle" block onClick={goBack}>
                  Pick another bank
                </Button>
              </div>

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
    </div>
  );
}
