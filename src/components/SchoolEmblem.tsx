import React from 'react';

interface SchoolEmblemProps {
  className?: string;
  logoUrl?: string;
  accentColor?: string;
}

export const SchoolEmblem: React.FC<SchoolEmblemProps> = ({
  className = 'w-10 h-10',
  logoUrl,
  accentColor = '#F59E0B',
}) => {
  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt="School Logo"
        referrerPolicy="no-referrer"
        className={`${className} object-contain rounded-full bg-white shadow-xs p-0.5 border border-slate-200/50`}
      />
    );
  }

  // Elegant academic SVG crest
  return (
    <div className={`${className} relative flex items-center justify-center rounded-full bg-white shadow-xs border border-amber-300/40 p-1 shrink-0`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Circular Ring with decorative notches */}
        <circle cx="50" cy="50" r="46" stroke={accentColor} strokeWidth="2.5" />
        <circle cx="50" cy="50" r="41" stroke="#1E3A8A" strokeWidth="1" strokeDasharray="3 2" />

        {/* Laurel Wreath on sides */}
        <path
          d="M20 54 C16 40 22 28 32 20 C28 26 26 36 28 46"
          stroke={accentColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M80 54 C84 40 78 28 68 20 C72 26 74 36 72 46"
          stroke={accentColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Open Book of Knowledge */}
        <path
          d="M32 64 C40 60 47 62 50 66 C53 62 60 60 68 64 L68 76 C60 72 53 74 50 78 C47 74 40 72 32 76 Z"
          fill="#1E3A8A"
        />
        <path
          d="M50 66 L50 78"
          stroke="#FFFFFF"
          strokeWidth="1.5"
        />

        {/* Deep / Flame of Wisdom (જ્ઞાન દીપક) */}
        <ellipse cx="50" cy="50" rx="14" ry="5" fill={accentColor} />
        <path
          d="M36 50 C38 58 62 58 64 50 Z"
          fill="#B45309"
        />
        <path
          d="M50 32 C54 40 57 44 50 48 C43 44 46 40 50 32 Z"
          fill="#DC2626"
        />
        <path
          d="M50 36 C52 41 53 43 50 46 C47 43 48 41 50 36 Z"
          fill="#FDE047"
        />

        {/* Sun rays / knowledge dawn */}
        <line x1="50" y1="12" x2="50" y2="18" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="38" y1="16" x2="42" y2="21" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="62" y1="16" x2="58" y2="21" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  );
};
