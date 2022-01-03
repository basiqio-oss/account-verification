// import { Transition } from '@headlessui/react';
import { ToastNotification } from '../components/ToastNotification';
import { AccountVerificationFormProvider } from '../components/AccountVerificationForm';
import '../styles.css';
import { TransitionLayout } from '../components/TransitionLayout';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <AccountVerificationFormProvider>
        <TransitionLayout>
          <Component {...pageProps} />
        </TransitionLayout>
      </AccountVerificationFormProvider>

      <ToastNotification />
    </>
  );
}
