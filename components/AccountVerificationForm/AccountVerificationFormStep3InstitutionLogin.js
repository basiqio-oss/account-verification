import { useState } from 'react';
import { useFormState } from 'react-use-form-state';
import axios from 'axios';
import { Button } from '../Button';
import { TextField } from '../TextField';
import { useAccountVerificationForm } from './AccountVerificationForm';
import { StepLogo } from './StepLogo';
import { StepHeading } from './StepHeading';
import { StepDescription } from './StepDescription';

const selectedInstitution = {
  type: 'institution',
  id: 'AU04301',
  name: 'Commonwealth Bank Australia',
  shortName: 'CBA',
  institutionType: 'Bank',
  country: 'Australia',
  serviceName: 'NetBank',
  serviceType: 'Personal Banking',
  loginIdCaption: 'NetBank client number',
  passwordCaption: 'Password',
  tier: '1',
  authorization: 'user',
  features: {
    login: ['web'],
    accounts: {
      accountNo: ['web', 'pdf', 'csv'],
      name: ['web', 'pdf', 'csv'],
      currency: ['web', 'pdf', 'csv'],
      balance: ['web', 'pdf', 'csv'],
      availableFunds: ['web', 'pdf', 'csv'],
      lastUpdated: ['web', 'pdf', 'csv'],
      accountHolder: ['web', 'pdf', 'csv'],
      meta: ['web', 'pdf'],
    },
    transactions: {
      status: ['web', 'pdf', 'csv'],
      description: ['web', 'pdf', 'csv'],
      date: ['web', 'pdf', 'csv'],
      amount: ['web', 'pdf', 'csv'],
      balance: ['web', 'pdf', 'csv'],
      class: ['web', 'pdf', 'csv'],
    },
    profile: {
      fullName: ['web'],
      firstName: ['web'],
      lastName: ['web'],
      middleName: [],
      phoneNumbers: ['web'],
      emailAddresses: ['web'],
      physicalAddresses: ['web', 'pdf'],
    },
  },
  forgottenPasswordUrl:
    'https://www2.my.commbank.com.au/netbank/UserMaintenance/Mixed/ForgotLogonDetails/FLDYourLogonDetails.aspx?RID=qDwlIjSTxUegatgUii17ow&SID=m7CHkGqm4XI%3d',
  stage: 'live',
  status: 'operational',
  stats: {
    averageDurationMs: {
      verifyCredentials: 22715,
      retrieveAccounts: 25827,
      retrieveTransactions: 36538,
      retrieveMeta: 4426,
      total: 89506,
    },
  },
  logo: {
    type: 'image',
    colors: null,
    links: {
      square: 'https://d388vpyfrt4zrj.cloudfront.net/AU04301.svg',
      full: 'https://d388vpyfrt4zrj.cloudfront.net/AU04301-full.svg',
    },
  },
  links: {
    self: 'https://au-api.basiq.io/institutions/AU04301',
  },
};

export function AccountVerificationFormStep3InstitutionLogin() {
  const { goForward, goBack, accountVerificationFormState } = useAccountVerificationForm();
  const [formState, { text, password }] = useFormState();
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const institutionId = selectedInstitution.id;

  // const { selectedInstitution } = accountVerificationFormState;
  // if (!selectedInstitution) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    console.log({ accountVerificationFormState });
    const jobId = await createConnection({
      userId: accountVerificationFormState.user.id,
    });
    setSubmitting(false);
    goForward();
    // setTimeout(() => {
    //   setSubmitting(false);
    //   setErrorMessage('Something went wrong');
    //   goForward();
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
                {...text('username')}
                id={selectedInstitution.loginIdCaption}
                label={selectedInstitution.loginIdCaption}
                placeholder={selectedInstitution.loginIdCaption}
                required
              />

              {/* securityCodeCaption (if exists, St George Bank e.g.) */}
              {selectedInstitution.securityCodeCaption && (
                <TextField
                  {...password('securityCode')}
                  id="username"
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
                  className="inline-block text-xs text-primary-600 underline rounded hover:text-opacity-90 active:text-opacity-75 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-30 ring-offset-1 ring-offset-transparent outline-none"
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

async function checkConnectionStatus({ userId, jobId }) {
  const token = await getToken();
  const response = await axios.get(`https://au-api.basiq.io/jobs/${jobId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  console.log({ response });
}

async function createConnection({ userId }) {
  const token = await getToken();
  console.log({ token });
  const jobId = await getJobId({ token, userId });
  console.log({ jobId });
  return jobId;
}

async function getToken() {
  const res = await axios.get('/api/client-token');
  return res.data;
}

async function getJobId({ token, userId }) {
  var data = JSON.stringify({
    loginId: 'Wentworth-Smith',
    password: 'Whistler',
    institution: {
      id: 'AU00000',
    },
  });
  const response = await axios.post(`https://au-api.basiq.io/users/${userId}/connections`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return response.data.id;
}
