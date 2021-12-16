export function ProgressBar({ value }) {
  return (
    <div className="fixed top-0 right-0 left-0 z-10">
      <div className="relative h-1 sm:h-1.5 md:h-2 w-full bg-white">
        <div
          style={{ width: `${value}%` }}
          className={`absolute top-0 left-0 bottom-0 bg-gradient-to-r from-primary-500 to-primary-accent transition-all ${
            value === 100 ? 'rounded-none' : 'rounded-r'
          } `}
        />
      </div>
      {/* Fade to blend form content nicely when scrolling down the page */}
      <div className="bg-gradient-to-b from-white to-transparent h-4 block" />
    </div>
  );
}
