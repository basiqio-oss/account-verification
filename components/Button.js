const VARIANT_MAP = {
  bold: 'bg-brand-500 text-white',
  subtle: 'bg-brand-100 text-black',
  inverted: 'bg-white text-black',
  critical: 'bg-critical-500 text-white',
};

export function Button({ variant = 'bold', block, children, loading, disabled: disabledProp, ...props }) {
  const variantClasses = VARIANT_MAP[variant];
  const disabled = loading || disabledProp;

  return (
    <button
      disabled={disabled}
      className={`px-8 h-12 rounded-lg text-center ${block ? 'block w-full' : 'inline-block'} ${variantClasses} ${
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      }`}
      {...props}
    >
      {loading ? <ButtonSpinner /> : children}
    </button>
  );
}

function ButtonSpinner() {
  return (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
