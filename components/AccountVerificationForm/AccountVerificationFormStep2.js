import { useState } from 'react';
import Image from 'next/image';
import { RadioGroup } from '@headlessui/react';
import { SearchInput } from '../SearchInput';
import { useAccountVerificationForm } from './AccountVerificationForm';

export function AccountVerificationFormStep2() {
  const { goForward } = useAccountVerificationForm();
  const [searchValue, setSearchValue] = useState('');

  function onChange() {
    goForward();
  }

  // Filter the list of banks based on the search input
  const filteredBanks = EXAMPLE_BANKS.filter(item => {
    if (!searchValue) return true;
    return item.value.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
  });

  return (
    <div className="flex flex-col flex-grow space-y-6 sm:space-y-8">
      {/* Logo */}
      {/* This helps the user keep context. */}
      <div className="flex justify-center">
        <div className="w-12 h-12 sm:w-16 sm:h-16 relative">
          <Image src="/logo-on-white.svg" alt="Piper logo" layout="fill" />
        </div>
      </div>

      {/* Step 3 - Header */}
      <div className="text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Find your bank</h1>
      </div>

      {/* Form content */}
      <div className="flex flex-col flex-grow space-y-3">
        <SearchInput
          labelScreenReader="Search"
          placeholder="Search"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        <form>
          {filteredBanks.length ? (
            // TODO: Fix keyboard navigation when switching between radio options
            <RadioGroup onChange={onChange}>
              <RadioGroup.Label className="sr-only">Select bank</RadioGroup.Label>
              <div className="space-y-3">
                {filteredBanks.map(bank => (
                  <RadioGroup.Option
                    key={bank.value}
                    value={bank.value}
                    className="relative rounded-lg p-3 cursor-pointer flex border hover:bg-primary-50 hover:border-primary-500 active:bg-primary-100 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-30 ring-offset-1 ring-offset-transparent outline-none transition-colors"
                  >
                    <div className="flex items-center w-full space-x-3">
                      {/* Institution logo */}
                      <div className="w-12 h-12 relative rounded overflow-hidden">
                        <Image src="/AU00001.svg" alt="Piper logo" layout="fill" />
                      </div>

                      {/* Institution shortName */}
                      <RadioGroup.Label as="p" className="flex flex-grow font-medium">
                        {bank.label}
                      </RadioGroup.Label>

                      {/* Chevron icon */}
                      <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          className="stroke-current text-gray-500"
                          d="M7.5 4.167 13.333 10 7.5 15.833"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
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
  {
    label: 'AMP',
    value: 'amp',
  },
  {
    label: 'Amex',
    value: 'amex',
  },
  {
    label: 'Bom',
    value: 'bom',
  },
  {
    label: 'BankSA',
    value: 'banksa',
  },
];
