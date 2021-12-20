import Head from 'next/head';
import Link from 'next/link';
import { Button } from '../components/Button';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Piper</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gradient-to-tr from-primary-bold to-primary-accent min-h-screen flex flex-col justify-center">
        <div className="mx-auto max-w-md px-4 pt-8 pb-14 text-center space-y-6">
          {/* Product logo and divider */}
          <div className="inline-block space-y-6">
            <img src="/product-logo-full.svg" alt="Piper logo" width={79} height={102} />
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

          {/* CTA to Account Verification flow */}
          <div className="mx-auto w-56">
            <Link href="/account-verification" passHref>
              <Button as="a" variant="inverted" block>
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
