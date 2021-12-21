import Head from 'next/head';
import { AccountVerificationForm } from '../components/AccountVerificationForm';

export default function AccountVerification() {
  return (
    <>
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
      <main className="text-black bg-white">
        <AccountVerificationForm />
        {/* TODO: Add background image */}
      </main>
    </>
  );
}
