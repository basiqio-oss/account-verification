import Head from 'next/head';
import { AccountVerificationForm } from '../components/AccountVerificationForm';

export default function AccountVerification() {
  return (
    <>
      <Head>
        <title>Piper</title>
        {/* TODO: Add favicon image */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <main className="antialiased">
        <AccountVerificationForm />
        {/* TODO: Add background image */}
      </main>
    </>
  );
}
