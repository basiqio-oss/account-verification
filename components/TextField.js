export function TextField({ id, label, type = 'text', error, required, ...props }) {
  return (
    <div className="space-y-2">
      <div className="space-y-2">
        <label htmlFor={id} className="text-xs text-primary font-light placeholder-gray-gray4 pt-2">
          {label} {required && <span className="text-red">*</span>}
        </label>
        <input
          type={type}
          className="w-full px-2 pb-1.5 text-primary outline-none text-base font-light rounded-md border-2"
          id={id}
          {...props}
        />
      </div>
      {error && <span className="text-critical-500 block">{error}</span>}
    </div>
  );
}
