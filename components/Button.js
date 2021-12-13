const VARIANT_MAP = {
  bold: 'bg-primary-500 text-white hover:bg-opacity-90 active:bg-opacity-75 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-30 ring-offset-1 ring-offset-transparent outline-none',
  subtle:
    'bg-primary-50 text-primary-500 hover:bg-primary-100 active:bg-primary-200 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-30 ring-offset-1 ring-offset-transparent outline-none',
  inverted:
    'bg-white text-primary-500 hover:bg-opacity-90 active:bg-opacity-75 focus:ring-2 focus:ring-white focus:ring-opacity-30 ring-offset-1 ring-offset-transparent	outline-none',
  critical:
    'bg-red-500 text-white hover:bg-opacity-90 active:bg-opacity-75 focus:ring-2 focus:ring-red-500 focus:ring-opacity-30 ring-offset-1 ring-offset-transparent	outline-none',
};

export function Button({
  as: Tag = 'button',
  variant = 'bold',
  block,
  children,
  loading,
  disabled: disabledProp,
  ...props
}) {
  const variantClasses = VARIANT_MAP[variant];
  const disabled = loading || disabledProp;
  return (
    <Tag
      disabled={disabled}
      className={`px-8 h-12 rounded-lg ${
        block ? 'w-full flex' : 'inline-flex'
      } items-center justify-center font-sans font-medium ${variantClasses} ${
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      }`}
      {...props}
    >
      {loading ? <ButtonSpinner /> : children}
    </Tag>
  );
}

function ButtonSpinner() {
  return (
    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
