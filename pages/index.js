import Link from 'next/link';
import { useAccountVerificationForm } from '../components/AccountVerificationForm';
import { Button, LoadingSpinner } from '../components/Button';
import { SEO } from '../components/SEO';

export default function Home() {
  const { basiqConnection, reset, hasCompletedForm } = useAccountVerificationForm();

  const basiqConnectionInProgress = basiqConnection?.inProgress;
  const basiqConnectionSuccess = basiqConnection?.completed;
  const basiqConnectionError = basiqConnection?.error;

  return (
    <div>
      <SEO />
      <main className="bg-gradient-to-tr from-primary-bold to-primary-accent min-h-screen flex flex-col justify-center">
        <div className="mx-auto max-w-md px-4 pt-8 pb-14 text-center space-y-6">
          {/* Product logo and divider */}
          <div className="inline-block space-y-6">
            <img src="/product-logo-full.svg" alt="Piper logo" width={79} height={102} />
            <div className="border-b border-white mix-blend-soft-light"></div>
          </div>

          {/* Product heading */}
          <h1 className="text-white text-2xl sm:text-3xl font-semibold tracking-tight">
            Start optimising <br />
            your savings
          </h1>

          {/* Product short description */}
          <p className="text-white text-sm sm:text-base text-opacity-90 leading-relaxed">
            Piper helps you track and optimise your savings. For every dollar saved you get 10% cashback into your
            account.
          </p>

          {hasCompletedForm ? (
            <div className="mx-auto w-64 space-y-2 sm:space-y-0">
              {/* VIEW CONNECTED ACCOUNT */}
              {/* It might be a good idea to let the user be able to view a summary of their 
              connected bank accounts. */}
              <Link href="/account-verification" passHref>
                <Button block variant="inverted">
                  View verified account
                </Button>
              </Link>

              {/* RESET APP */}
              {/* For developer use only; this will reset state and delete connection */}
              <div className="relative sm:fixed sm:top-0 sm:right-0 sm:px-6 md:px-8 sm:pt-6 mix-blend-soft-light">
                <button
                  className="text-xs sm:text-sm text-white rounded hover:text-opacity-90 active:text-opacity-75 focus:ring-2 focus:ring-primary-bold focus:ring-opacity-30 ring-offset-1 ring-offset-transparent outline-none"
                  onClick={reset}
                >
                  Reset app
                </button>
              </div>
            </div>
          ) : (
            <div className="mx-auto w-56">
              {/* CTA to Account Verification flow */}
              <div className="relative">
                {/* Indicator */}
                {basiqConnectionInProgress && (
                  <span className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2 flex h-6 w-6 shadow-md rounded-full">
                    {basiqConnectionSuccess || basiqConnectionError ? (
                      <IndicatorConnectionFinished error={basiqConnectionError} />
                    ) : (
                      <IndicatorConnectionInProgress />
                    )}
                  </span>
                )}
                {/* Action */}
                <Link href="/account-verification" passHref>
                  <Button as="a" variant="inverted" block>
                    {basiqConnectionInProgress ? 'Continue setup' : 'Get started'}
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function IndicatorConnectionInProgress() {
  return (
    <span className="inline-flex rounded-full h-full w-full text-white items-center justify-center p-1 bg-primary-bold">
      <LoadingSpinner />
    </span>
  );
}

function IndicatorConnectionFinished({ error }) {
  return (
    <>
      <span
        className={`absolute animate-ping inline-flex h-full w-full rounded-full ${
          error ? 'bg-critical-bold' : 'bg-success-bold'
        }`}
      />
      <span
        className={`inline-flex rounded-full h-full w-full text-white items-center justify-center ${
          error ? 'bg-critical-bold' : 'bg-success-bold'
        }`}
      >
        {error ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-critical-subtle"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-success-subtle"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </span>
    </>
  );
}
