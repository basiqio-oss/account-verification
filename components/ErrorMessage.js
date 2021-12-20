export function ErrorMessage({ errorMessage }) {
  return (
    <div role="alert" className="bg-critical-subtle p-3 rounded-lg border-2 border-critical-bold flex space-x-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-critical-bold flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="text-critical-bold-darker">{errorMessage}</span>
    </div>
  );
}
