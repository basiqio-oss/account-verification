# Account verification

This application takes a user through the account verification process using the Basiq API.

## Getting started

### 1. Clone the repository

To get started, you will first need to clone the repository and `cd` into your new directory.

```sh
git clone git@github.com:bridget-basiq/account-verification.git
cd account-verification
```

### 2. API key setup

You will need to [Sign-up](https://dashboard.basiq.io/login) to the Basiq API service and grab your API key for your application (via the [Developer Dashboard](https://dashboard.basiq.io/)).

Once you have a Basiq API key, move the sample `.env.sample` file to `.env.local`

```sh
mv .env.sample .env.local
```

Now paste in your Basiq API key next to `BASIQ_API_KEY=`

```diff
- BASIQ_API_KEY=
+ BASIQ_API_KEY=abc123
```

### 3. Install dependencies

Install dependencies with [`yarn`](https://github.com/yarnpkg/yarn).If you don't have this installed, please read their [installation guide](https://yarnpkg.com/en/docs/install) for detailed instructions.

```sh
yarn
```

### 4. Start the development server

```sh
yarn dev
```

You should now see the website running at `http://localhost:3000`

## Built with

This project has been built with the following technologies

- [Next.js](https://github.com/vercel/next.js/)
- [Tailwind](https://github.com/tailwindlabs/tailwindcss)
- [HeadlessUI](https://github.com/tailwindlabs/headlessui)
