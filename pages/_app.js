import { useEffect } from 'react';
import { ToastProvider } from 'react-toast-notifications';
import { AccountVerificationFormProvider } from '../components/AccountVerificationForm';
import { Toast } from '../components/Toast';
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

// SET VIEW HEIGHT
// These overrides fix bugs in mobile browsers when using `100vh` for the layout to fill height of viewport
// More info: https://www.markusantonwolf.com/blog/solution-to-the-mobile-viewport-height-issue-with-tailwind-css/
function setViewHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
