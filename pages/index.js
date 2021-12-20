import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gradient-to-tr from-primary-500 to-primary-accent min-h-screen flex flex-col justify-center">
        <div className="mx-auto max-w-md px-4 pt-8 pb-14 text-center space-y-6">
          {/* Logo and divider */}
          <div className="inline-block space-y-6">
            <Image src="/logo-on-dark.svg" alt="Piper logo" width={79} height={102} />
            <div className="border-b mix-blend-soft-light"></div>
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
              <Button block variant="inverted">
                View verified account
              </Button>
              <Button block>Reset app</Button> {/** TODO */}
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
