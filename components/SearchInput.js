export function SearchInput({ labelScreenReader, ...props }) {
  return (
    <div className="relative">
      {/* Search label (for screen readers only) and icon */}
      <label htmlFor="search" className="absolute top-auto left-0 h-12 w-12 flex items-center justify-center">
        <span className="sr-only">{labelScreenReader}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            className="stroke-current text-gray-500"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
          />
        </svg>
      </label>

      {/* Search input */}
      <input
        id="search"
        type="search"
        className="w-full h-12 pl-11 pr-3 text-black text-base outline-none rounded-lg border border-gray-300 focus:border-primary-bold focus:ring-2 focus:ring-primary-bold focus:ring-opacity-30 ring-offset-1 ring-offset-transparent"
        {...props}
      />
    </div>
  );
}
