export function TextField({ id, label, type = 'text', error, ...props }) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm text-black font-medium leading-none block">
        {label}
      </label>
      <input
        type={type}
        className={`w-full h-12 px-3 bg-white placeholder-neutral-muted text-black text-base outline-none rounded-lg border  focus:border-primary-bold focus:ring-2 focus:ring-primary-bold focus:ring-opacity-30 ring-offset-1 ring-offset-transparent ${
          error ? 'border-critical-bold' : 'border-neutral-dimdarker'
        }`}
        id={id}
        {...props}
      />
      {error && <span className="text-sm text-critical-bolddarker block">{error}</span>}
    </div>
  );
}
