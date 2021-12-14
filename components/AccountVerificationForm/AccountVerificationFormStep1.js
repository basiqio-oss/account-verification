import Image from 'next/image';
import { Button } from '../Button';
import { useAccountVerificationForm } from './AccountVerificationForm';

export function AccountVerificationFormStep1() {
  const { goForward } = useAccountVerificationForm();
  return (
    <div className="flex flex-col flex-grow space-y-6 sm:space-y-8">
      {/* Logo */}
      {/* This helps the user keep context. */}
      <div className="flex justify-center">
        <div className="w-12 h-12 sm:w-16 sm:h-16 relative">
          <Image src="/logo-on-white.svg" alt="Piper logo" layout="fill" />
        </div>
      </div>

      {/* Form content */}
      <div className="flex flex-col flex-grow justify-center space-y-6 sm:space-y-8">
        {/* Step 2 - Header */}
        {/* A short as possible heading. It's important to communicate the value exchange, i.e. what will the product be able to do once the user has connected their bank. */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Let’s connect your
            <br />
            bank account
          </h1>

          {/* Value exchange, e.g. a paragraph that answers the question "Why should I connect my bank account?" */}
          <p className="text-sm sm:text-base text-gray-600">
            We need to verify the details of the account to deduct the nominated regular fee from.
          </p>
        </div>

        {/* Build trust */}
        {/* Present the user with valid arguments for why it's 100% secure to connect to their bank through the app. */}
        <ul className="bg-gray-50 rounded-lg">
          {/* Secure argument 1 */}
          <li className="px-4 sm:px-6 py-4 bg-gradient-to-tr from-primary-500 to-secondary rounded-lg space-x-4 flex items-center">
            <div className="flex flex-grow sm:text-lg text-white font-medium sm:leading-snug">
              Bank grade 256-bit <br />
              SSL encryption
            </div>

            {/* Icon: shield-check */}
            <svg
              className="w-12 h-12 sm:w-14 sm:h-14 flex-no-shrink"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <path
                className="fill-current text-secondary-400"
                d="m41.236 11.969.968-.251a1 1 0 0 0-1.019-.748l.05.998ZM24 5.889l.667-.746a1 1 0 0 0-1.334 0l.667.745Zm-17.236 6.08.05-1a1 1 0 0 0-1.018.749l.968.25ZM24 41.243l-.25.968a1 1 0 0 0 .5 0l-.25-.968ZM41.185 10.97c-.392.02-.787.03-1.185.03v2c.431 0 .86-.011 1.286-.033l-.1-1.997ZM40 11a22.91 22.91 0 0 1-15.333-5.857l-1.334 1.49A24.911 24.911 0 0 0 40 13v-2ZM23.333 5.143A22.91 22.91 0 0 1 8 11v2a24.91 24.91 0 0 0 16.667-6.365l-1.334-1.49ZM8 11c-.398 0-.793-.01-1.185-.03l-.101 1.998c.426.022.855.032 1.286.032v-2Zm-2.204.719A25.043 25.043 0 0 0 5 18h2c0-1.998.255-3.935.732-5.781l-1.936-.501ZM5 18c0 11.65 7.968 21.437 18.75 24.212l.5-1.937C14.328 37.722 7 28.715 7 18H5Zm19.25 24.212C35.031 39.437 43 29.65 43 18h-2c0 10.715-7.329 19.722-17.25 22.275l.5 1.937ZM43 18c0-2.168-.276-4.274-.796-6.282l-1.936.501c.477 1.846.732 3.783.732 5.78h2Z"
              />
              <path
                className="stroke-current text-white"
                d="m18 24 4 4 8-8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </li>

          {/* Secure argument 2 */}
          <li className="mx-4 sm:mx-6 py-4 flex items-center border-b">
            <div className="flex flex-grow text-sm sm:text-base leading-relaxed">
              We never save your bank <br />
              login credentials in the app
            </div>

            {/* Icon: key */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
              <svg
                className="w-8 h-8 sm:w-9 sm:h-9 flex-no-shrink"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
              >
                <path
                  className="stroke-current text-secondary-600"
                  d="M20 9.333A2.667 2.667 0 0 1 22.667 12M28 12a8 8 0 0 1-10.324 7.657l-3.01 3.01H12v2.666H9.333V28h-4A1.333 1.333 0 0 1 4 26.667v-3.448c0-.354.14-.693.39-.943l7.953-7.952A8 8 0 1 1 28 12Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </li>

          {/* Secure argument 3 */}
          <li className="mx-4 sm:mx-6 py-4 space-x-4 flex items-center">
            <div className="flex flex-grow text-sm sm:text-base leading-relaxed">
              We can not transact <br />
              on your behalf
            </div>

            {/* Icon: credit-card */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
              <svg
                className="w-8 h-8 sm:w-9 sm:h-9 flex-no-shrink"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
              >
                <path
                  className="stroke-current text-secondary-600"
                  d="M4 13.333h24M9.333 20h1.334M16 20h1.333M8 25.333h16a4 4 0 0 0 4-4V10.667a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v10.666a4 4 0 0 0 4 4Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </li>
        </ul>

        {/* Powered by Basiq API */}
        {/* TODO: Write more */}
        <p className="text-xs text-gray-600 text-center max-w-xs mx-auto leading-relaxed">
          Powered by open banking platform{' '}
          <a
            target="_blank"
            href="https://basiq.io"
            rel="noopener noreferrer"
            className="text-primary-600 underline rounded hover:text-opacity-90 active:text-opacity-75 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-30 ring-offset-1 ring-offset-transparent outline-none"
          >
            basiq.io
          </a>{' '}
          to securely connect your bank account.
        </p>

        {/* Actions */}
        <div className="space-y-2">
          <Button variant="bold" block onClick={goForward}>
            Continue
          </Button>

          {/* TODO: Hook up Learn more dialog */}
          <Button variant="subtle" block>
            Learn more
          </Button>
        </div>
      </div>
    </div>
  );
}
