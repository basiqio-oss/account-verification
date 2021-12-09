export function TextField({ id, label, type = 'text', error, ...props }) {
  return (
    <div className="space-y-2">
      <div className="space-y-2">
        <label htmlFor={id} className="text-sm text-primary placeholder-gray-gray4 pt-2">
          {label}
        </label>
        <input
          type={type}
          className="w-full px-3 text-primary outline-none text-base font-light rounded-md border border-gray-muted h-12"
          id={id}
          {...props}
        />
      </div>
      {error && <span className="text-sm text-critical-500 block">{error}</span>}
    </div>
  );
}
