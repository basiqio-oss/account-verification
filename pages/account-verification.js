import Head from 'next/head';
import { AccountVerificationForm } from '../components/AccountVerificationForm';

export default function AccountVerification() {
  return (
    <>
      <Head>
        <title>Piper</title>
        {/* TODO: Add favicon image */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <AccountVerificationForm />
        {/* TODO: Add background image */}
      </main>
    </>
  );
}
