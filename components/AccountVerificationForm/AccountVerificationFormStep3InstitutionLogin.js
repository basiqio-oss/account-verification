import { useState, useMemo } from 'react';
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
  const { selectedInstitution } = accountVerificationFormState;

  const [formState, { text, password }] = useFormState();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState();

  const formFields = useMemo(() => {
    if (!selectedInstitution) return;
    return Object.keys(selectedInstitution)
      .filter(key => key.endsWith('Caption'))
      .map(key => {
        const id = key.replace('Caption', '');
        const label = selectedInstitution[key];
        const placeholder = selectedInstitution[key];
        return {
          id,
          label,
          placeholder,
          // We should always show a password field, except for the loginId field
          ...(id === 'loginId' ? text(id) : password(id)),
        };
      });
  }, [password, selectedInstitution, text]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createBasiqConnection({
        ...formState.values,
        institution: { id: selectedInstitution.id },
      });
      setSubmitting(false);
    } catch (error) {
      setError(error.message);
      setSubmitting(false);
    }
  }

  if (!selectedInstitution) return null;

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

              {formFields.map(field => (
                <div key={field.id} className="space-y-2">
                  <TextField {...field} />
                  {/** Forgot password */}
                  {field.id === 'password' && (
                    <a
                      href={selectedInstitution.forgottenPasswordUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-xs text-primary-bold-darker underline rounded hover:text-opacity-90 active:text-opacity-75 focus:ring-2 focus:ring-primary-bold focus:ring-opacity-30 ring-offset-1 ring-offset-transparent outline-none"
                    >
                      Forgot password?
                    </a>
                  )}
                </div>
              ))}

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

  const { error, progress, stepNameInProgress } = basiqConnection;

  return (
    <div className="flex flex-col flex-grow space-y-6 sm:space-y-8">
      <StepLogo src={selectedInstitution.logo.links.square} alt={`Logo of ${selectedInstitution.name}`} />
      <div className="flex flex-col flex-grow justify-center space-y-6 sm:space-y-8 items-center text-center">
        <VerificationProgress value={progress} error={error} />
        {error ? (
          <div className="space-y-2">
            <h3 className="font-bold text-xl">{error.name}</h3>
            <p>{error.message}</p>
          </div>
        ) : progress !== 100 ? (
          <div className="space-y-2">
            <h3 className="font-bold text-xl">{STEP_NAME_MAP[stepNameInProgress]}</h3>
            <p>Usually takes takes {ms(estimatedTime, { long: true })}</p>
          </div>
        ) : (
          <div className="space-y-2">
            <h3 className="font-bold text-2xl">Connected 🎉</h3>
            <p>One last step to go...</p>
            <Button block onClick={goForward}>
              Continue
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

const STEP_NAME_MAP = {
  'verify-credentials': 'Verifying credentials...',
  'retrieve-accounts': 'Retrieving accounts...',
};
