import type { ReactNode } from "react";

export type IconName = "fuel" | "heating" | "percent" | "wallet" | "menu" | "close" | "arrow" | "external";

const PATHS: Record<IconName, ReactNode> = {
  fuel: (
    <>
      <rect x="4" y="3" width="10" height="18" rx="2" />
      <path d="M14 9h1.5a2 2 0 0 1 2 2v4a1.5 1.5 0 0 0 3 0V8.5L17.5 6" />
      <path d="M7.5 7.5h3" />
    </>
  ),
  heating: (
    <>
      <path d="M12 3.5c.6 2.6 3.5 4.6 3.5 8.5a3.5 3.5 0 0 1-7 0c0-1.9.9-3.1 1.9-4.1.1 1.4.6 2.3 1.6 2.9-.2-2.5.1-4.3 0-7.3Z" />
      <path d="M5 20.5h14" />
    </>
  ),
  percent: (
    <>
      <circle cx="7.5" cy="7.5" r="2.5" />
      <circle cx="16.5" cy="16.5" r="2.5" />
      <path d="M18.5 5.5 5.5 18.5" />
    </>
  ),
  wallet: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2.5" />
      <path d="M3 10h18" />
      <circle cx="16.5" cy="14.5" r="1.25" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  external: (
    <>
      <path d="M14 5h5v5" />
      <path d="M10 14 19 5" />
      <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </>
  ),
};

export default function Icon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
