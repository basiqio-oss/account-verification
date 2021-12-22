import Link from 'next/link';
import { useAccountVerificationForm } from '../components/AccountVerificationForm';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';

export default function Home() {
  const { accountVerificationFormState, basiqConnection } = useAccountVerificationForm();

  const isConnected =
    accountVerificationFormState.user &&
    accountVerificationFormState.selectedInstitution &&
    accountVerificationFormState.selectedAccount;

  const basiqConnectionInProgress = basiqConnection?.progress > 0;
  const basiqConnectionError = basiqConnectionInProgress ? basiqConnection?.error : undefined;

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
          {isConnected ? (
            <div className="mx-auto w-64 space-y-2">
              {/** TODO */}
              <Link href="/account-verification" passHref>
                <Button block variant="inverted">
                  View verified account
                </Button>
              </Link>
              {/** TODO: Johan resetState function */}
              <Button block>Reset app</Button>
            </div>
          ) : (
            <div className="mx-auto w-56">
              {/* CTA to Account Verification flow */}
              <div className="relative">
                {basiqConnectionInProgress && <Indicator error={basiqConnectionError} />}
                <Link href="/account-verification" passHref>
                  <Button as="a" variant="inverted" block>
                    Get started
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

function Indicator({ error }) {
  return (
    <span className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2 flex h-4 w-4">
      <span
        className={`absolute animate-ping inline-flex h-full w-full rounded-full ${
          error ? 'bg-critical-subtle' : 'bg-secondary-bold-lighter'
        } opacity-75`}
      />
      <span className={`inline-flex rounded-full h-full w-full ${error ? 'bg-critical-bold' : 'bg-secondary-bold'}`} />
    </span>
  );
}
