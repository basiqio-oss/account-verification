import { RadioGroup } from '@headlessui/react';
import { useAccountVerificationForm } from './AccountVerificationForm';
import { TextField } from '../TextField';
import { useState } from 'react';

export function AccountVerificationFormStep2() {
  const { goForward } = useAccountVerificationForm();
  const [searchValue, setSearchValue] = useState();

  function onChange() {
    goForward();
  }

  // Filter the list of banks based on the search input
  const filteredBanks = EXAMPLE_BANKS.filter(item => {
    if (!searchValue) return true;
    return item.value.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
  });

  return (
    <div>
      <div className="text-center space-y-6">
        <h1>Find your bank</h1>
      </div>
      <div className="space-y-4">
        <TextField
          label="Search"
          placeholder="Search"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        <form>
          {filteredBanks.length ? (
            <RadioGroup onChange={onChange}>
              <RadioGroup.Label className="sr-only">Select bank</RadioGroup.Label>
              <div className="space-y-2">
                {filteredBanks.map(bank => (
                  <RadioGroup.Option
                    key={bank.value}
                    value={bank.value}
                    className="relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none"
                  >
                    <div className="flex items-center justify-between w-full">
                      <RadioGroup.Label as="p">{bank.label}</RadioGroup.Label>
                      <span>&rarr;</span>
                    </div>
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          ) : (
            <span>No results found</span>
          )}
        </form>
      </div>
    </div>
  );
}

const EXAMPLE_BANKS = [
  {
    label: 'CBA',
    value: 'cba',
  },
  {
    label: 'ANZ',
    value: 'anz',
  },
  {
    label: 'NAB',
    value: 'nab',
  },
  {
    label: 'Westpac',
    value: 'westpac',
  },
];
