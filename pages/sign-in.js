import Head from 'next/head';
import { AccountVerificationForm } from '../components/AccountVerificationForm';

export default function SignIn() {
  return (
    <>
      <Head>
        <title>Basiq account verification</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <AccountVerificationForm />
      </main>
    </>
  );
}
