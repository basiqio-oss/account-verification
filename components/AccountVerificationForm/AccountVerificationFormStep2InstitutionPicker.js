import { useEffect, useState } from 'react';
import axios from 'axios';
import { RadioGroup } from '@headlessui/react';
import { SearchInput } from '../SearchInput';
import { Button } from '../Button';
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
      <StepLogo src="/product-logo-square.svg" alt="Piper logo" />

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
            // Whilst loading
            <InstitutionsLoadingSkeleton />
          ) : error || !data || data.length === 0 ? (
            // Error or no
            <InstitutionsErrorScene />
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
                        className="relative rounded-lg p-3 cursor-pointer flex border border-neutral-dim hover:bg-primary-subtle hover:border-primary-bold active:bg-primary-subtle-darker focus:border-primary-bold focus:ring-2 focus:ring-primary-bold focus:ring-opacity-30 ring-offset-1 ring-offset-transparent outline-none transition-colors"
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
                              className="stroke-current text-neutral-muted"
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
                <InstitutionsNoMatchingResults />
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

// LOADING INSTITUTIONS SKELETON
// Keeps the user visually occupied whilst institutions are loading,
// making the experience seem quicker than it might be
function InstitutionsLoadingSkeleton() {
  const skeletonItems = [...new Array(10).keys()];

  return (
    <div className="space-y-3">
      {skeletonItems.map(i => (
        <div key={i} className="rounded-lg p-3 flex border border-neutral-subtle-darker animate-pulse">
          <div className="flex items-center w-full space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-neutral-subtle-darker" />
            <div className="bg-neutral-subtle-darker rounded h-4 w-48" />
          </div>
        </div>
      ))}
    </div>
  );
}

// INSTITUTIONS ERROR SCENE
// If institutions could not be fetched, let the user know and provide ability to try fetching the list again
function InstitutionsErrorScene() {
  return (
    <div className="space-y-6 sm:space-y-8 py-3">
      <div className="flex flex-col items-center space-y-6 sm:space-y-8 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-critical-bold"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>

        <div className="space-y-3">
          <h2 className="font-semibold text-center text-xl tracking-tight">Banks couldn’t be fetched</h2>
          <p className="text-sm text-center text-neutral-muted-darker">
            Something went wrong whilst fetching the list of banks. If the problem persists, please contact support.
          </p>
        </div>
      </div>
      {/* TODO: Hook up button to try and reload list of institutions */}
      <Button block>Try again</Button>
    </div>
  );
}

// NO MATCHING FILTER RESULTS
// If institutions could not be fetched, let the user know and provide ability to try fetching the list again
function InstitutionsNoMatchingResults() {
  return (
    <div className="space-y-6 sm:space-y-8 py-3">
      <div className="flex flex-col items-center space-y-6 sm:space-y-8 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-neutral-muted"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>

        <div className="space-y-3">
          <h2 className="font-semibold text-center text-xl tracking-tight">No matching results</h2>
          <p className="text-sm text-center text-neutral-muted-darker">
            There were no banks matching your search text. Please double-check spelling again. If the problem persists,
            contact support.
          </p>
        </div>
      </div>
    </div>
  );
}
