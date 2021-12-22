import { Button } from './Button';

export function ErrorScene({ title, message, actionOnClick }) {
  return (
    <div role="alert" className="space-y-6 sm:space-y-8">
      <div className="flex flex-col items-center space-y-6 sm:space-y-8 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-critical-bold"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        <div className="space-y-3">
          <h2 className="font-semibold text-center text-xl sm:text-2xl tracking-tight">{title}</h2>
          <p className="text-sm sm:text-base text-center text-neutral-muted-darker leading-relaxed">{message}</p>
        </div>
      </div>
      <Button block onClick={actionOnClick}>
        Try again
      </Button>
    </div>
  );
}
