export function StepLogo({ src, alt }) {
  return (
    <div className="flex justify-center">
      {/* Square sized svgs recommended (both product logo and institution logo) */}
      <img className="rounded-lg w-14 h-14 sm:w-16 sm:h-16" src={src} alt={alt} />
    </div>
  );
}
