import { useEffect, useState } from 'react';
import axios from 'axios';
import { RadioGroup } from '@headlessui/react';
import { SearchInput } from '../SearchInput';
import { useAccountVerificationForm } from './AccountVerificationForm';
import { StepLogo } from './StepLogo';
import { StepHeading } from './StepHeading';

export function AccountVerificationFormStep2InstitutionPicker() {
  const { goForward, updateAccountVerificationFormState } = useAccountVerificationForm();
  const [searchValue, setSearchValue] = useState('');
  const { data, error, loading } = useInstitutionsData();

  // When a user selects a bank, update the form state and push the user to the next step
  function onChange(selectedInstitution) {
    updateAccountVerificationFormState({ selectedInstitution });
    goForward();
  }

  // LOADING INSTITUTIONS SKELETON
  // Keeps the user visually occupied whilst institutions are loading,
  // making the experience seem quicker than it might be
  function InstitutionsLoadingSkeleton() {
    return (
      <div className="space-y-3">
        {Array.apply(null, { length: 10 }).map((e, i) => (
          <div key={i} className="rounded-lg p-3 flex border border-gray-100 animate-pulse">
            <div className="flex items-center w-full space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-gray-100" />
              <div className="bg-gray-100 rounded h-4 w-48" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // FILTERING INSTITUTIONS
  // If the user is searching, filter out any institutions which do not match the search term
  // We use both the "name" and "shortName" attributes for searching
  const filteredInstitutions = data
    ? searchValue
      ? data.filter(({ name, shortName }) => {
          const val = searchValue.toLocaleLowerCase();
          return name.toLocaleLowerCase().includes(val) || shortName.toLocaleLowerCase().includes(val);
        })
      : data
    : [];

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
            <InstitutionsLoadingSkeleton />
          ) : error ? (
            // TODO
            <p>Error</p>
          ) : !data || data.length === 0 ? (
            // TODO
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

// Custom react hook for managing our fetch request to retrieves a list institutions
// The code for this API route can be found in `pages/api/institutions`
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
