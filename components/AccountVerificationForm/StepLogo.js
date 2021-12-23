export function StepLogo({ src, alt }) {
  return (
    <div className="flex justify-center">
      {/* Square sized svgs recommended (both product logo and institution logo) */}
      <img className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg" src={src} alt={alt} />
    </div>
  );
}
