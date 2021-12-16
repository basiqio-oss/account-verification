import { useEffect, useState } from 'react';
import axios from 'axios';
import { RadioGroup } from '@headlessui/react';
import { SearchInput } from '../SearchInput';
import { useAccountVerificationForm } from './AccountVerificationForm';
import { StepLogo } from './StepLogo';
import { StepHeading } from './StepHeading';
import { Button } from '../Button';

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
            disabled={loading || error || !data || data.length === 0}
          />
          {loading ? (
            <InstitutionsLoadingSkeleton />
          ) : error ? (
            // If error
            <>
              <div className="flex flex-col items-center space-y-6 bg-red-50 rounded-lg border border-red-200 p-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <h2 role="alert" className="font-semibold text-center text-lg">
                  Something went wrong
                </h2>
                <p className="text-sm text-center">
                  An error occurred whilst trying to fetch the list of banks. If the problem persists, contact support.
                </p>
              </div>
              {/* TODO: Hook up button to try and reload list of institutions */}
              <Button block>Try again</Button>
            </>
          ) : data || data.length === 0 ? (
            // If no data
            <>
              <div className="flex flex-col items-center space-y-6 bg-gray-50 rounded-lg border  p-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <h2 className="font-semibold text-center text-lg">No institutions found..</h2>
                <p className="text-sm text-center">If the problem persists, contact support.</p>
              </div>
              {/* TODO: Hook up button to try and reload list of institutions */}
              <Button block>Try again</Button>
            </>
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
