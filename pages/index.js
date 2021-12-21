import Head from 'next/head';
import Link from 'next/link';
import { Button } from '../components/Button';
import { useAccountVerificationForm } from '../components/AccountVerificationForm';

export default function Home() {
  const { accountVerificationFormState } = useAccountVerificationForm();

  const isConnected =
    accountVerificationFormState.user &&
    accountVerificationFormState.selectedInstitution &&
    accountVerificationFormState.selectedAccount;

  return (
    <div>
      <Head>
        <title>Piper</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#4737ff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
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
              <Link href="/account-verification" passHref>
                <Button as="a" variant="inverted" block>
                  Get started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
