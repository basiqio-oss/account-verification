export function TextField({ id, label, type = 'text', error, ...props }) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm text-black font-medium leading-none block">
        {label}
      </label>
      <input
        type={type}
        className={`w-full h-12 px-3 text-black text-base outline-none rounded-lg border focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-30 ring-offset-1 ring-offset-transparent ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        id={id}
        {...props}
      />
      {error && <span className="text-sm text-red-600 block">{error}</span>}
    </div>
  );
}
