# Account verification

This application takes a user through the account verification process using the BasiqConnectControl UI component.

It is built with a React FE, Express/NodeJS backend.

Before you can spin up you will need to create a `.env` file and create a variable `BASIQ_API_KEY` in which you store your applications API key.

## Getting started

Clone the repository and `cd` into the new directory.

```sh
git clone git@github.com:bridget-basiq/account-verification.git
cd account-verification
```

Install dependencies with [`yarn`](https://github.com/yarnpkg/yarn).If you don't have this installed, please read their [installation guide](https://yarnpkg.com/en/docs/install) for detailed instructions.

```sh
yarn
```

Start the development server

```sh
yarn dev
```

You should now see the website running at `http://localhost:3000`

## Built with

This project has been built with the following technologies

- [Next.js](https://github.com/vercel/next.js/)
- [Tailwind](https://github.com/tailwindlabs/tailwindcss)
- [HeadlessUI](https://github.com/tailwindlabs/headlessui)
- [Express](https://github.com/expressjs/express)
- [Node](https://github.com/nodejs/node)
