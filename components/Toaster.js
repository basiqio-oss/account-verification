import { forwardRef } from 'react';
import { useToaster, toast } from 'react-hot-toast';

// Toaster
// based on https://react-hot-toast.com/docs/use-toaster
// ------------------------------------------------------------

export function Toaster() {
  const { toasts, handlers } = useToaster({
    duration: 20000,
    position: 'top-center',
  });
  const { startPause, endPause, calculateOffset, updateHeight } = handlers;
  return (
    <div
      className="fixed top-3 left-1/2 -translate-x-1/2 w-72 sm:w-96"
      onMouseEnter={startPause}
      onMouseLeave={endPause}
    >
      {toasts.map(toast => {
        const offset = calculateOffset(toast, {
          reverseOrder: false,
          gutter: 8,
        });
        const ref = el => {
          console.log(el);
          if (el && !toast.height) {
            const height = el.getBoundingClientRect().height;
            updateHeight(toast.id, height);
          }
        };
        return (
          <div key={toast.id} ref={ref} {...toast.ariaProps}>
            <Toast offset={offset} {...toast} />
          </div>
        );
      })}
    </div>
  );
}

const APPEARANCE_MAP = {
  critical: 'bg-critical-subtle border-critical-bold',
  success: 'bg-success-subtle border-success-bold',
};

function Toast({ id, title, message, appearance, offset }) {
  return (
    <div
      className={`absolute top-0 left-0 right-0 flex space-x-3 rounded-lg text-black p-3 shadow-lg border-l-8 ${
        APPEARANCE_MAP[toast.appearance]
      } animate-[fadeIn_250ms] transition-all duration-500  ${toast.visible ? 'opacity-1' : 'opacity-0'} `}
      style={{
        transform: `translateY(${offset}px)`,
      }}
    >
      {/* Toast icon */}
      {appearance === 'critical' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0 w-6 h-6 text-critical-bold"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0 w-6 h-6 text-success-bold"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {/* Toast content */}
      <div className="flex flex-col flex-grow space-y-1">
        {title && <span className="font-medium leading-normal">{title}</span>}
        {message && <span className="text-sm">{message}</span>}
      </div>
      {/* Dismiss */}
      <button
        onClick={() => toast.dismiss(id)}
        className="flex items-center justify-center flex-shrink-0 w-6 h-6 rounded outline-none hover:opacity-90 active:opacity-75 focus:ring-2 focus:ring-neutral-muted focus:ring-opacity-30 ring-offset-1 ring-offset-transparent"
      >
        <span className="sr-only">Dismiss</span>
        {/* Icon: x */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0 w-5 h-5 text-neutral-muted"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
