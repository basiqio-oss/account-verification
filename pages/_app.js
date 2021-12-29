import { useEffect } from 'react';
import { ToastProvider } from 'react-toast-notifications';
import { AccountVerificationFormProvider } from '../components/AccountVerificationForm';
import { Toast } from '../components/Toast';
import { setViewHeight } from '../utils/setViewHeight';
import '../styles.css';

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    setViewHeight();
    window.addEventListener('resize', () => {
      setViewHeight();
    });
  });

  return (
    <ToastProvider components={{ Toast }} autoDismiss autoDismissTimeout={10000} placement="top-center">
      <AccountVerificationFormProvider>
        <Component {...pageProps} />
      </AccountVerificationFormProvider>
    </ToastProvider>
  );
}
