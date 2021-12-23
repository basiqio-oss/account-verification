import { useToggleState } from '../utils/useToggleState';

export function PasswordField({ id, label, error, ...props }) {
  const [visible, toggleVisibility] = useToggleState(false);
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm text-black font-medium leading-none block">
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          type={visible ? 'text' : 'password'}
          className={`w-full h-12 px-3 pr-12 bg-white placeholder-neutral-muted text-black text-base outline-none rounded-lg border  focus:border-primary-bold focus:ring-2 focus:ring-primary-bold focus:ring-opacity-30 ring-offset-1 ring-offset-transparent ${
            error ? 'border-critical-bold' : 'border-neutral-dim-darker'
          }`}
          id={id}
        />
        <button
          type="button"
          className="absolute top-0 right-0 h-12 w-12 flex items-center justify-center text-primary-bold"
          onClick={toggleVisibility}
        >
          {visible ? <VisibleIcon /> : <NotVisibleIcon />}
        </button>
      </div>
      {error && <span className="text-sm text-critical-bold-darker block">{error}</span>}
    </div>
  );
}

function VisibleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );
}

function NotVisibleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
      />
    </svg>
  );
}
