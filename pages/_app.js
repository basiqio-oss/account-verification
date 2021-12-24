import { AccountVerificationFormProvider } from '../components/AccountVerificationForm';
import { Toaster } from '../components/Toaster';
import '../styles.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <AccountVerificationFormProvider>
        <Component {...pageProps} />
      </AccountVerificationFormProvider>
      <Toaster />
    </>
  );
}
