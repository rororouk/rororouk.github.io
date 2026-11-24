import { useId } from "react";

type LogoProps = {
  size?: "sm" | "md";
};

/**
 * Brand mark of «Рахівник»: a minimalist abacus emblem with three sliding beads
 * in a blue-to-indigo badge paired with clean geometric typography.
 */
export default function Logo({ size = "md" }: LogoProps) {
  const gradId = useId();
  const markSize = size === "sm" ? "size-8" : "size-9";
  const textSize = size === "sm" ? "text-base" : "text-lg";

  return (
    <span className="inline-flex items-center gap-2.5">
      <svg
        viewBox="0 0 36 36"
        className={`${markSize} shrink-0 drop-shadow-[0_4px_10px_rgba(37,99,235,0.22)]`}
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradId} x1="2" y1="2" x2="34" y2="34" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#4338ca" />
          </linearGradient>
        </defs>
        <rect x="1.5" y="1.5" width="33" height="33" rx="10" fill={`url(#${gradId})`} />
        <rect x="2.25" y="2.25" width="31.5" height="31.5" rx="9.25" stroke="#ffffff" strokeOpacity="0.18" />

        {/* Three abacus rails */}
        <line x1="8.5" y1="12" x2="27.5" y2="12" stroke="#bfdbfe" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.65" />
        <line x1="8.5" y1="18" x2="27.5" y2="18" stroke="#bfdbfe" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.65" />
        <line x1="8.5" y1="24" x2="27.5" y2="24" stroke="#bfdbfe" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.65" />

        {/* Sliding beads forming a subtle «Р» / counting rhythm */}
        <rect x="9" y="9.6" width="8.5" height="4.8" rx="2.4" fill="#ffffff" />
        <circle cx="23.5" cy="12" r="2.4" fill="#fbbf24" />

        <circle cx="12.5" cy="18" r="2.4" fill="#93c5fd" />
        <rect x="17.5" y="15.6" width="9.5" height="4.8" rx="2.4" fill="#ffffff" />

        <rect x="9" y="21.6" width="11.5" height="4.8" rx="2.4" fill="#ffffff" />
        <circle cx="25" cy="24" r="2.4" fill="#34d399" />
      </svg>

      <span className="flex flex-col leading-none">
        <span className={`${textSize} font-bold tracking-tight text-slate-950`}>
          Рахів<span className="text-blue-600">ник</span>
        </span>
      </span>
    </span>
  );
}
