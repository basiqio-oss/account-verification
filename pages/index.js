import Link from 'next/link';
import { useAccountVerificationForm } from '../components/AccountVerificationForm';
import { Button } from '../components/Button';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { SEO } from '../components/SEO';

export default function Home() {
  const { basiqConnection, reset, hasCompletedForm } = useAccountVerificationForm();

  const basiqConnectionInProgress = basiqConnection?.inProgress;
  const basiqConnectionSuccess = basiqConnection?.completed;
  const basiqConnectionError = basiqConnection?.error;

  return (
    <div>
      <SEO />
      <main className="flex flex-col justify-center min-h-screen bg-gradient-to-tr from-primary-bold to-primary-accent">
        <div className="max-w-md px-4 pt-8 mx-auto text-center pb-14 space-y-6">
          {/* Product logo and divider */}
          <div className="inline-block space-y-6">
            <img src="/product-logo-full.svg" alt="Piper logo" width={79} height={102} />
            <div className="border-b border-white mix-blend-soft-light"></div>
          </div>

          {/* Product heading */}
          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Start optimising <br />
            your savings
          </h1>

          {/* Product short description */}
          <p className="text-sm leading-relaxed text-white sm:text-base text-opacity-90">
            Piper helps you track and optimise your savings. For every dollar saved you get 10% cashback into your
            account.
          </p>

          {hasCompletedForm ? (
            <div className="w-64 mx-auto space-y-2 sm:space-y-0">
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
              <div className="absolute top-0 right-0 px-4 pt-4 sm:px-6 md:px-8 sm:pt-8 md:fixed mix-blend-hard-light">
                <button
                  className="text-xs text-white rounded outline-none sm:text-sm hover:text-opacity-90 active:text-opacity-75 focus:ring-2 focus:ring-primary-bold focus:ring-opacity-30 ring-offset-1 ring-offset-transparent"
                  onClick={reset}
                >
                  Reset app
                </button>
              </div>
            </div>
          ) : (
            <div className="w-56 mx-auto">
              {/* CTA to Account Verification flow */}
              <div className="relative">
                {/* Indicator */}
                {(basiqConnectionInProgress || basiqConnectionSuccess) && (
                  <span className="absolute top-0 right-0 flex w-6 h-6 rounded-full shadow-md -translate-y-1/2 translate-x-1/2">
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
                    {basiqConnectionInProgress || basiqConnectionSuccess ? 'Continue setup' : 'Get started'}
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
    <span className="inline-flex items-center justify-center w-full h-full p-1 text-white rounded-full bg-primary-bold">
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
            className="w-5 h-5 text-critical-subtle"
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
            className="w-5 h-5 text-success-subtle"
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
