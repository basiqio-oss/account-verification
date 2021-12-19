import { Button } from '../Button';
import { useAccountVerificationForm } from './AccountVerificationForm';
import { StepHeading } from './StepHeading';
import { StepDescription } from './StepDescription';
import { StepLogo } from './StepLogo';

export function AccountVerificationFormStep5Summary() {
  const { finish, accountVerificationFormState } = useAccountVerificationForm();

  const { selectedInstitution } = accountVerificationFormState;
  if (!selectedInstitution) return null;

  return (
    <div className="flex flex-col flex-grow space-y-6 sm:space-y-8">
      {/* SUCCESS ICON */}
      {/* TODO: add animation for extra delight */}
      <div className="flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 sm:w-16 sm:h-16 text-secondary-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      {/* STEP CONTENT */}
      <div className="flex flex-col flex-grow justify-center space-y-6 sm:space-y-8">
        {/* STEP HEADING */}
        <StepHeading>You&apos;re all set!</StepHeading>

        {/* STEP DESCRIPTION */}
        <StepDescription>
          We have verified the details of the bank account below, and you’re good to go.
        </StepDescription>

        {/* SUMMARY */}
        <ul role="list" className="divide-y border-t border-b">
          <li className="py-3 space-x-4 flex items-center">
            <div className="flex flex-col flex-grow">
              <span className="text-xs text-gray-600">Commonwealth Bank Australia</span>
              <span className="font-medium">Smart Access</span>
              <span className="text-xs font-medium">$1,000.00</span>
            </div>

            {/* Connected bank logo */}
            <div className="relative">
              <StepLogo src={selectedInstitution.logo.links.square} alt={`Logo of ${selectedInstitution.name}`} />

              {/* Icon: check-circle (https://heroicons.com/) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -top-2 -right-2 h-6 w-6 text-secondary-600 border-white bg-white rounded-full"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </li>
        </ul>

        {/* We recommend giving the user the ability to remove their 
        bank connection should they wish to. */}
        <p className="text-xs sm:text-sm text-gray-600 text-center">
          You can manage your bank connections <br />
          in the app settings later.
        </p>

        {/* Action */}
        <Button variant="bold" block onClick={finish}>
          Done
        </Button>
      </div>
    </div>
  );
}
