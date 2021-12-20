const diameter = 180;
const strokeWidth = 6;
const center = diameter / 2;
const pathRadius = center - strokeWidth / 2;

export function VerificationProgress({ label, value, error }) {
  const pathRatio = getPathRatio({ value });

  // Calculate dash coordinates relative to the circle (the actual "progress" bar)
  const { circumference, offset } = getPathDimensions({ pathRadius, pathRatio });

  // Consolidate common circle properties
  const circleProps = {
    cx: center,
    cy: center,
    r: pathRadius,
    strokeWidth: strokeWidth,
    className: `stroke-current transition-all duration-500 ${error ? 'text-red-500' : 'text-primary-500'}`,
    style: { fillOpacity: 0 },
  };

  return (
    <div className="relative" style={{ height: diameter, width: diameter }}>
      <svg
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-valuetext={label}
        role="progressbar"
        viewBox={`0 0 ${diameter} ${diameter}`}
      >
        <circle {...circleProps} strokeOpacity={0.15} />
        <circle {...circleProps} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex justify-center items-center p-5">
        {error ? (
          <VerificationProgressError error={error} />
        ) : (
          <span className="text-primary-500 text-3xl font-bold">{value}%</span>
        )}
      </div>
    </div>
  );
}

function VerificationProgressError({ error }) {
  return (
    <div className="flex flex-col items-center text-center space-y-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          className="stroke-current text-red-500"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <span className="text-red-500 font-bold leading-tight">{error}</span>
    </div>
  );
}

// ratio of path length, as a value between 0 and 1
function getPathRatio({ value }) {
  const clamped = Math.min(Math.max(value, 0), 100);
  return (clamped - 0) / (100 - 0);
}

// circumference: pixel value of the circle
// offset: shift backward so the gap appears at the correct distance
function getPathDimensions({ pathRatio, pathRadius }) {
  const circumference = Math.PI * 2 * pathRadius;
  const offset = (1 - pathRatio) * circumference;
  return { circumference, offset };
}
