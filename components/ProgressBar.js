export function ProgressBar({ value }) {
  return (
    <div className="relative w-full h-1 bg-white sm:h-1.5 md:h-2">
      <div
        style={{ width: `${value}%` }}
        className={`absolute top-0 left-0 bottom-0 tracking-tight tabular-nums bg-gradient-to-r from-primary-bold to-primary-accent transition-all ${
          value === 100 ? 'rounded-none' : 'rounded-r'
        } `}
      />
    </div>
  );
}
