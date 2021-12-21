export function EmptyScene({ title, message }) {
  return (
    <div className="space-y-6 sm:space-y-8 py-3">
      <div className="flex flex-col items-center space-y-6 sm:space-y-8 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-neutral-muted"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>

        <div className="space-y-3">
          <h2 className="font-semibold text-center text-xl tracking-tight">{title}</h2>
          <p className="text-sm text-center text-neutral-muted-darker leading-relaxed">{message}</p>
        </div>
      </div>
    </div>
  );
}
