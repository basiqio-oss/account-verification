import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { Button } from '../Button';
import { TextField } from '../TextField';
import { useAccountVerificationForm } from './AccountVerificationForm';

export function AccountVerificationFormStep4() {
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [account, setAccount] = useState(EXAMPLE_ACCOUNTS[0]);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 2000);
  }

  if (success) {
    return <AccountVerificationFormStep4Success />;
  }

  return (
    <div>
      <div className="text-center space-y-6">
        <h1>Select your daily spending account</h1>
        <p>
          Please select an account that allows direct debits. Many banks only allow withdrawals from transaction
          accounts.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        {EXAMPLE_ACCOUNTS.length ? (
          <RadioGroup value={account} onChange={setAccount}>
            <RadioGroup.Label className="sr-only">Select bank</RadioGroup.Label>
            <div className="space-y-2">
              {EXAMPLE_ACCOUNTS.map(bank => (
                <RadioGroup.Option
                  key={bank.value}
                  value={bank}
                  className={`relative rounded-lg shadow-md px-5 py-4 flex focus:outline-none ${
                    bank.disabled ? 'cursor-not-allowed opacity-20' : 'cursor-pointer'
                  }`}
                  disabled={bank.disabled}
                >
                  {({ checked }) => (
                    <div className="flex justify-between w-full">
                      <span>{bank.disabled ? 'Disabled' : checked ? 'Check' : ''}</span>
                      <div className="flex-1 pl-4">
                        <RadioGroup.Label as="p">{bank.title}</RadioGroup.Label>
                        <dl className="grid grid-cols-2">
                          <dt className="flex-1">Available:</dt>
                          <dd>{bank.available}</dd>
                          <dt className="flex-1">Balance</dt>
                          <dd>{bank.balance}</dd>
                        </dl>
                      </div>
                    </div>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        ) : (
          <span>No results found</span>
        )}
        <Button type="submit" loading={submitting} block>
          Finish
        </Button>
      </form>
    </div>
  );
}

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

function AccountVerificationFormStep4Success() {
  const { finish } = useAccountVerificationForm();
  return (
    <div>
      <div className="text-center space-y-6">
        <h1>You&apos;re all set</h1>
        <p>We have verified the details of the bank account below, and you’re good to go.</p>
      </div>
      <p>You can manage your bank connections in the app settings later.</p>
      <Button variant="bold" block onClick={finish}>
        Finish
      </Button>
    </div>
  );
}
