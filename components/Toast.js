export function Toast({ title, children, appearance, onDismiss }) {
  return (
    <div
      role="alert"
      className={`flex space-x-3 max-w-xs rounded-lg border-2 text-black p-3 shadow-md ${
        appearance === 'critical' ? 'bg-critical-subtle border-critical-bold' : 'bg-success-subtle border-success-bold'
      }`}
    >
      {/* Toast icon */}
      {appearance === 'critical' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-critical-bold flex-shrink-0"
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
          className="h-6 w-6 text-success-bold flex-shrink-0"
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
        {title && <span className="font-medium">{title}</span>}
        {children && <span className="text-xs">{children}</span>}
      </div>

      {/* Dismiss */}
      {onDismiss ? (
        <button
          onClick={onDismiss}
          className="flex w-6 h-6 justify-center items-center rounded hover:opacity-90 active:opacity-75 focus:ring-2 focus:ring-neutral-muted focus:ring-opacity-30 ring-offset-1 ring-offset-transparent outline-none flex-shrink-0"
        >
          <span className="sr-only">Dismiss</span>
          {/* Icon: x */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-neutral-muted flex-shrink-0"
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
      ) : null}
    </div>
  );
}
