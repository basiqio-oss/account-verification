# Account verification

This application takes a user through the account verification process using the Basiq API. This project has been to built with three main technologies:

1. [Basiq API](https://api.basiq.io)
   Basiq is a Consumer Data Right accredited API platform that provides the building blocks of financial services.
2. [Next.js](https://github.com/vercel/next.js/)
   A framework for React, Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more. No config needed.
3. [Tailwind](https://github.com/tailwindlabs/tailwindcss)
   A utility-first CSS framework that can be composed to build any design, directly in your markup.

## Getting started

### 1. Clone the repository

To get started, you will first need to clone the repository and `cd` into your new directory.

```sh
git clone git@github.com:bridget-basiq/account-verification.git
cd account-verification
```

### 2. API key setup

You will need to [Sign-up](https://dashboard.basiq.io/login) to the Basiq API service and grab your API key for your application (via the [Developer Dashboard](https://dashboard.basiq.io/)).

Once you have a Basiq API key, move the sample `.env.sample` file to `.env.local` and paste in your Basiq API key next to `BASIQ_API_KEY=`

```sh
mv .env.sample .env.local
```

```diff
- BASIQ_API_KEY=
+ BASIQ_API_KEY=abc123
```

### 3. Install dependencies

Install dependencies with [`yarn`](https://github.com/yarnpkg/yarn). If you don't have this installed, please read their [installation guide](https://yarnpkg.com/en/docs/install) for detailed instructions.

```sh
yarn
```

### 4. Start the development server

```sh
yarn dev
```

🎉 You should now see the website running at `http://localhost:3000`

## Testing

### Linting

This project uses `eslint` to enforce code quality and code formatting. For more information about using NextJS and ESLint, please refer to [this guide](https://nextjs.org/docs/basic-features/eslint).

### End-to-End tests

[Cypress](https://github.com/cypress-io/cypress) is a test runner used for End-to-End (E2E) and Integration Testing. This project includes a simple E2E test which is used to test the account verification form flow.

To run the E2E tests locally, you will first need have the website up and running. This can be done by either running `yarn dev` or `yarn build && yarn start`. The latter can be used when you want to run the tests againts the production build of the website. Once you have the website running in another terminal window run `yarn cypress`.
