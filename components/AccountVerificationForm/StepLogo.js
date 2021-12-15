import Image from 'next/image';

// TODO: Should there be a default src?
export function StepLogo({ src, alt }) {
  return (
    <div className="flex justify-center">
      {/* Square sized svgs recommended (both product logo and institution logo) */}
      <div className="w-12 h-12 sm:w-16 sm:h-16 relative">
        <Image src={src} alt={alt} layout="fill" />
      </div>
    </div>
  );
}
