import { useEffect, useState } from 'react';
import axios from 'axios';
import { RadioGroup } from '@headlessui/react';
import { SearchInput } from '../SearchInput';
import { useAccountVerificationForm } from './AccountVerificationForm';
import { StepLogo } from './StepLogo';
import { StepHeading } from './StepHeading';

export function AccountVerificationFormStep2() {
  const { goForward, updateAccountVerificationFormState } = useAccountVerificationForm();
  const [searchValue, setSearchValue] = useState('');
  const { data, error, loading } = useInstitutionsData();

  // When a user selects a bank, update the form state and push the user to the next step
  function onChange(selectedInstitution) {
    updateAccountVerificationFormState({ selectedInstitution });
    goForward();
  }

  // If the user is searching, filter out any institutions which do not match the search term
  // We use both the "name" and "shortName" attributes for searching
  const filteredInstitutions =
    // If there is data
    data
      ? // If there is a search value
        searchValue
        ? // Filter the data by search value
          data.filter(({ name, shortName }) => {
            const val = searchValue.toLocaleLowerCase();
            return name.toLocaleLowerCase().includes(val) || shortName.toLocaleLowerCase().includes(val);
          })
        : // Otherwise, use the data
          data
      : // If no data, fallback to empty array
        [];

  return (
    <div className="flex flex-col flex-grow space-y-6 sm:space-y-8">
      {/* STEP LOGO */}
      {/* To help the user keep context of what product they're using, */}
      {/* and what bank they're about to connect to. */}
      <StepLogo src="/logo-on-white.svg" alt="Piper logo" />

      {/* STEP CONTENT */}
      <div className="flex flex-col flex-grow space-y-6 sm:space-y-8">
        {/* STEP HEADING */}
        {/* A short as possible heading to help the user quickly recognise the task at hand. */}
        <StepHeading>Find your bank</StepHeading>

        {/* INSTITUTIONS */}
        <div className="space-y-3">
          <SearchInput
            labelScreenReader="Search"
            placeholder="Search"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
          {loading ? (
            <p>Loading</p>
          ) : error ? (
            <p>Error</p>
          ) : !data || data.length === 0 ? (
            <p>No institutions found</p>
          ) : (
            <form>
              {filteredInstitutions.length ? (
                // TODO: Fix keyboard navigation when switching between radio options
                <RadioGroup onChange={onChange}>
                  <RadioGroup.Label className="sr-only">Select bank</RadioGroup.Label>
                  <div className="space-y-3">
                    {filteredInstitutions.map(institution => (
                      <RadioGroup.Option
                        key={institution.id}
                        value={institution}
                        className="relative rounded-lg p-3 cursor-pointer flex border hover:bg-primary-50 hover:border-primary-500 active:bg-primary-100 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-30 ring-offset-1 ring-offset-transparent outline-none transition-colors"
                      >
                        <div className="flex items-center w-full space-x-3">
                          {/* Institution logo */}
                          <img
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-md"
                            src={institution.logo.links.square}
                            alt={`Logo of ${institution.name}`}
                          />

                          {/* Institution shortName */}
                          <RadioGroup.Label as="p" className="flex flex-grow font-medium">
                            {institution.shortName}
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
          )}
        </div>
      </div>
    </div>
  );
}

function useInstitutionsData() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    axios
      .get('/api/institutions')
      .then(res => setData(res.data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
