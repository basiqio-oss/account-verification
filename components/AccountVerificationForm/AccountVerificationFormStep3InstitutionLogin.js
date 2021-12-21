import { useState } from 'react';
import { useFormState } from 'react-use-form-state';
import ms from 'ms';
import { Button } from '../Button';
import { TextField } from '../TextField';
import { VerificationProgress } from '../VerificationProgress';
import { ErrorMessage } from '../ErrorMessage';
import { useAccountVerificationForm } from './AccountVerificationFormProvider';
import { StepLogo } from './StepLogo';
import { StepHeading } from './StepHeading';
import { StepDescription } from './StepDescription';

export function AccountVerificationFormStep3InstitutionLogin() {
  const { basiqConnection } = useAccountVerificationForm();

  if (!basiqConnection) {
    return <AccountVerificationFormStep3InstitutionLoginForm />;
  }

  return <AccountVerificationFormStep3InstitutionLoginProgress />;
}

function AccountVerificationFormStep3InstitutionLoginForm() {
  const { goBack, accountVerificationFormState, createBasiqConnection } = useAccountVerificationForm();
  const [formState, { text, password }] = useFormState();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState();

  const { selectedInstitution } = accountVerificationFormState;
  if (!selectedInstitution) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      console.log({ formState });
      await createBasiqConnection({
        // loginId: formState.values.loginId,
        // securityCode: formState.values.securityCode,
        // password: formState.values.password,
        // institution: { id: selectedInstitution.id },
        // TODO remove these testing credentials
        loginId: 'gavinBelson',
        password: 'hooli2016',
        institution: { id: 'AU00000' },
      });
      setSubmitting(false);
    } catch (error) {
      setError(error.message);
      setSubmitting(false);
    }
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
              {/* Error state */}
              {error && <ErrorMessage message={error.message} />}

              {/* TODO: 
              The best way to approach this is to look for attributes with the "Caption" suffix to know what to render
              Pass these additional login parameters as optional arguments when you create any connection. 
              
              Can we map over all the attributes ending in Caption for a neater solution? */}
              {/* Login ID */}
              <TextField
                {...text('loginId')}
                id="loginId"
                label={selectedInstitution.loginIdCaption}
                placeholder={selectedInstitution.loginIdCaption}
                required
              />

              {/* securityCodeCaption (if exists, St George Bank e.g.) */}
              {selectedInstitution.securityCodeCaption && (
                <TextField
                  {...password('securityCode')}
                  id="securityCode"
                  label={selectedInstitution.securityCodeCaption}
                  placeholder={selectedInstitution.securityCodeCaption}
                  required
                />
              )}

              {/* Password */}
              <div className="space-y-2">
                <TextField
                  {...password('password')}
                  id="password"
                  label={selectedInstitution.passwordCaption}
                  placeholder={selectedInstitution.passwordCaption}
                  required
                />

                {/* Forgotten password */}
                <a
                  href={selectedInstitution.forgottenPasswordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs text-primary-bold-darker underline rounded hover:text-opacity-90 active:text-opacity-75 focus:ring-2 focus:ring-primary-bold focus:ring-opacity-30 ring-offset-1 ring-offset-transparent outline-none"
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function AccountVerificationFormStep3InstitutionLoginProgress() {
  const { goForward, accountVerificationFormState, basiqConnection } = useAccountVerificationForm();
  const { selectedInstitution } = accountVerificationFormState;

  // The estimated time job is expected time to take (in milliseconds)
  // For this demo, we only care about the "verify-credentials" and "retrieve-accounts" step
  const estimatedTime =
    selectedInstitution.stats.averageDurationMs.verifyCredentials +
    selectedInstitution.stats.averageDurationMs.retrieveAccounts;

  const { error, progress } = basiqConnection;

  return (
    <div className="flex flex-col flex-grow space-y-6 sm:space-y-8">
      <StepLogo src={selectedInstitution.logo.links.square} alt={`Logo of ${selectedInstitution.name}`} />

      <div className="flex flex-col flex-grow justify-center space-y-6 sm:space-y-8 items-center text-center">
        <VerificationProgress value={progress} error={error} />
        {error ? (
          <div className="w-full space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-semibold text-xl sm:text-2xl">Error</h3>
              <p className="text-sm sm:text-base text-neutral-muted-darker">{error.message}</p>
            </div>
            {/* TODO: Hook up "Try again" to go back to InstitutionLogin form */}
            <Button block>Try again</Button>
          </div>
        ) : progress !== 100 ? (
          <div className="w-full space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="font-semibold text-xl sm:text-2xl tracking-tight">Verifying credentials...</h2>
              <p className="text-sm sm:text-base text-neutral-muted-darker">
                Usually takes {ms(estimatedTime, { long: true })}
              </p>
            </div>
            {/* TODO: Hook up "Minimise"-feature, onClick go to Home and listen for connection process to finish/error out */}
            <Button block variant="subtle">
              Resume in background
            </Button>
          </div>
        ) : (
          <div className="w-full space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-semibold text-xl sm:text-2xl">Connected 🎉</h3>
              <p className="text-sm sm:text-base text-neutral-muted-darker">One last step to go...</p>
            </div>
            <Button block onClick={goForward}>
              Continue
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
