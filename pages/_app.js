import { ToastProvider } from 'react-toast-notifications';
import { AccountVerificationFormProvider } from '../components/AccountVerificationForm';
import { Toast } from '../components/Toast';
import '../styles.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <ToastProvider components={{ Toast }} autoDismiss autoDismissTimeout={10000} placement="top-center">
      <AccountVerificationFormProvider>
        <Component {...pageProps} />
      </AccountVerificationFormProvider>
    </ToastProvider>
  );
}
