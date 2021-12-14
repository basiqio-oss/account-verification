import Head from 'next/head';
import Link from 'next/link';
import { Button } from '../components/Button';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Basiq account verification</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-brand-500 text-white min-h-screen flex flex-col justify-center">
        <div className="mx-auto max-w-md py-2 text-center space-y-10 ">
          <h1 className="text-6xl">Start optimising your savings</h1>
          <p>
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
