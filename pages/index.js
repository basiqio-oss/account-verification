import Head from 'next/head';
import Link from 'next/link';
import { Button } from '../components/Button';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Piper</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <main className="bg-gradient-to-tr from-primary-500 to-accent min-h-screen flex flex-col justify-center antialiased">
        <div className="mx-auto max-w-md py-2 text-center space-y-10">
          <h1 className="text-white text-3xl font-semibold tracking-tight">
            Start optimising <br />
            your savings
          </h1>
          <p className="text-white text-opacity-90 leading-relaxed">
            Piper helps you track and optimise your savings. For every dollar saved you get 10% cashback into your
            account.
          </p>
          <Link href="/sign-in" passHref>
            <Button as="a" variant="inverted" block>
              Get started
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
