import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { RadioGroup } from '@headlessui/react';
import { TextField } from '../TextField';
import { useAccountVerificationForm } from './AccountVerificationForm';

export function AccountVerificationFormStep2() {
  const { goForward, updateAccountVerificationFormState } = useAccountVerificationForm();
  const [searchValue, setSearchValue] = useState('');
  const { data, error, loading } = useInstitutionsData();

  // When a user selects a bank, update the form state and push the user to the next step
  function onChange(selectedInstitution) {
    updateAccountVerificationFormState({ selectedInstitution });
    goForward();
  }

  // The list of institutions is loading
  if (loading) {
    return <p>Loading institutions</p>;
  }

  // Something went wrong while fetching rhe lost of institutions
  if (error) {
    return <p>Something went wrong</p>;
  }

  // The list of institutions loaded, but no data was returned from the server
  if (!data || data.length === 0) {
    return <p>No institutions found</p>;
  }

  // TODO should this be sorted alphabetically ? Or just use the order that comes back from the basiq API?
  const filteredInstitutions = data.filter(item => {
    // Filter out any institutions which are currently not operational
    // TODO confirm this logic is correct
    if (item.stage !== 'live' || item.status !== 'operational') return false;
    // If the user is searching, filter out any institutions which do not match the search term
    if (!searchValue) return true;
    return (
      item.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      item.shortName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  });

  return (
    <div>
      <div className="text-center space-y-6">
        <h1>Find your institution</h1>
      </div>
      <div className="space-y-4">
        <TextField
          label="Search"
          placeholder="Search"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        <form>
          {filteredInstitutions.length ? (
            <RadioGroup onChange={onChange}>
              <RadioGroup.Label className="sr-only">Select institution</RadioGroup.Label>
              <div className="space-y-2">
                {filteredInstitutions.map(institution => (
                  <RadioGroup.Option
                    key={institution.id}
                    value={institution}
                    className="relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none"
                  >
                    <div className="flex items-center justify-between w-full">
                      <img
                        className="w-12 h-12"
                        src={institution.logo.links.square}
                        alt={`Logo of ${institution.name}`}
                      />
                      <RadioGroup.Label as="p">{institution.name}</RadioGroup.Label>
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

function useInstitutionsData() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();

  // TODO check if this should a call directly to the Basiq API server
  useEffect(() => {
    axios
      .get('/api/institutions')
      .then(res => setData(res.data.data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
