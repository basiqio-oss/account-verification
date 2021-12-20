import { useEffect, useState } from 'react';
import axios from 'axios';
import { RadioGroup } from '@headlessui/react';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';
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

export function AccountVerificationFormStep4SelectAccount() {
  const { goForward, accountVerificationFormState, updateAccountVerificationFormState } = useAccountVerificationForm();
  const [selectedAccount, setSelectedAccount] = useState(EXAMPLE_ACCOUNTS[0]);

  const { data, error, loading } = useAccountsData();

  // const { selectedInstitution } = accountVerificationFormState;
  // if (!selectedInstitution) return null;

  // Example submit to show off loading state / success state
  // TODO what if something goes wrong?
  function handleSubmit(e) {
    e.preventDefault();
    goForward();
    updateAccountVerificationFormState({ selectedAccount });
  }

  return (
    <div className="flex flex-col flex-grow space-y-6 sm:space-y-8">
      {/* STEP LOGO */}
      {/* To help the user keep context of what product they're using, */}
      {/* and what bank they're about to connect to. */}
      <StepLogo src={selectedInstitution.logo.links.square} alt={`Logo of ${selectedInstitution.name}`} />

      {/* STEP CONTENT */}
      <div className="flex flex-col flex-grow justify-center space-y-6 sm:space-y-8">
        {/* STEP HEADING */}
        {/* A short as possible heading to help the user quickly recognise the task at hand. */}
        <StepHeading>
          Select your daily <br />
          spending account
        </StepHeading>

        {/* STEP DESCRIPTION */}
        <StepDescription>
          Please select an account that allows direct debits. Many banks only allow withdrawals from transaction
          accounts.
        </StepDescription>

        {error ? (
          <span>Error</span>
        ) : loading ? (
          <span>Loading</span>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {data.length ? (
              <RadioGroup value={selectedAccount} onChange={setSelectedAccount}>
                <RadioGroup.Label className="sr-only">Select account</RadioGroup.Label>
                <div className="space-y-3">
                  {data.map((acc, idx) => {
                    const disabled = acc.status !== 'available';
                    return (
                      <RadioGroup.Option
                        key={idx}
                        value={acc}
                        disabled={disabled}
                        className={`rounded-lg outline-none ${
                          !disabled &&
                          'focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-30 ring-offset-1 ring-offset-transparent'
                        }`}
                      >
                        {({ checked }) => (
                          <div
                            className={`relative rounded-lg p-3 flex  ${
                              disabled
                                ? 'bg-gray-100 cursor-not-allowed opacity-50'
                                : 'cursor-pointer border hover:bg-primary-50 hover:border-primary-500 active:bg-primary-100 transition-colors'
                            } ${checked && 'bg-primary-50 border-primary-500'}`}
                          >
                            <div className="flex flex-grow space-x-3">
                              {disabled ? (
                                // Lock icon
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                  />
                                </svg>
                              ) : (
                                // Radio circle
                                <span
                                  className={`flex items-center justify-center w-6 h-6 rounded-full bg-white border-2  ${
                                    checked ? 'border-primary-500' : 'border-gray-300'
                                  }`}
                                >
                                  {checked && <span className={`w-2 h-2 rounded-full bg-primary-500`} />}
                                </span>
                              )}

                              <div className="flex-grow space-y-2">
                                <RadioGroup.Label as="p" className="font-medium">
                                  {acc.name}
                                </RadioGroup.Label>
                                <span className="text-gray-600 text-xs">{acc.accountNo}</span>
                                <dl className="grid grid-cols-2 gap-y-0.5 text-gray-600 text-xs">
                                  <dt className="flex-1">Available:</dt>
                                  <dd className="text-right text-black font-medium">
                                    {formatCurrency(acc.availableFunds)}
                                  </dd>
                                  <dt className="flex-1">Balance:</dt>
                                  <dd className="text-right">{formatCurrency(acc.balance)}</dd>
                                </dl>
                              </div>
                            </div>
                          </div>
                        )}
                      </RadioGroup.Option>
                    );
                  })}
                </div>
              </RadioGroup>
            ) : (
              // TODO
              <span>No results found</span>
            )}
            <Button type="submit" block>
              Finish
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

function useAccountsData() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    axios
      .get('/api/accounts')
      .then(res => setData(res.data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

// TODO this will come from an API
const EXAMPLE_ACCOUNTS = [
  {
    title: 'Smart access',
    accountNumber: 'XXX-XXX XXXX 4435',
    available: '$1,488.43',
    balance: '$1,523.24',
  },
  {
    title: 'Smart access 2',
    accountNumber: 'XXX-XXX XXXX 4435',
    available: '$1,488.43',
    balance: '$1,523.24',
  },
  {
    title: 'Netbank saver',
    accountNumber: 'XXX-XXX XXXX 4435',
    available: '$1,488.43',
    balance: '$1,523.24',
    disabled: true,
  },
  {
    title: 'CommSec shares',
    accountNumber: 'XXX-XXX XXXX 4435',
    available: '$1,488.43',
    balance: '$1,523.24',
    disabled: true,
  },
];
