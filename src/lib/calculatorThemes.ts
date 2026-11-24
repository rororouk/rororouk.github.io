import { CALCULATOR_GIFS } from "@/assets/gifs";

import type { CalculatorSlug } from "@/lib/calculators";

export type CalculatorVisualKind = "route" | "heat" | "growth" | "salary";

/**
 * Visual identity of every calculator. The same tokens are used by the card on the home
 * page and by the calculator page itself, so each tool keeps one recognizable look.
 * Class names are full static strings so Tailwind can detect them at build time.
 */
export type CalculatorTheme = {
  /** Order number shown as a watermark, e.g. "01". */
  number: string;
  kicker: string;
  promise: string;
  caption: string;
  visual: CalculatorVisualKind;
  /** Small looping animation for the «Корисна стаття» block. */
  gif: string;
  /** Static frame of the animation for users who prefer reduced motion. */
  gifStill: string;
  /** Column span of the card in the home page grid. */
  span: string;
  band: string;
  chip: string;
  iconWrap: string;
  accentText: string;
  glow: string;
  watermark: string;
  cardHover: string;
  focusRing: string;
  pageGlow: string;
  input: string;
  button: string;
  skeleton: string;
  softPanel: string;
};

export const CALCULATOR_THEMES: Record<CalculatorSlug, CalculatorTheme> = {
  fuel: {
    number: "01",
    kicker: "Подорожі",
    promise: "Скільки коштує дорога — ще до виїзду.",
    caption: "Літри і гривні для будь-якого маршруту",
    visual: "route",
    gif: CALCULATOR_GIFS.fuel.animated,
    gifStill: CALCULATOR_GIFS.fuel.still,
    span: "lg:col-span-7",
    band: "bg-amber-500",
    chip: "bg-amber-100 text-amber-800",
    iconWrap: "bg-amber-500 text-white",
    accentText: "text-amber-700",
    glow: "bg-amber-200/80",
    watermark: "text-amber-100",
    cardHover: "hover:border-amber-300",
    focusRing: "focus-visible:ring-amber-200",
    pageGlow: "from-amber-100/70",
    input: "focus:border-amber-500 focus:ring-amber-100",
    button: "bg-amber-700 hover:bg-amber-800 disabled:hover:bg-amber-700 focus-visible:ring-amber-200",
    skeleton: "bg-amber-100/80",
    softPanel: "border-amber-200/80 bg-amber-50",
  },
  heating: {
    number: "02",
    kicker: "Дім",
    promise: "Місяць тепла — у зрозумілій сумі.",
    caption: "Де дім втрачає тепло",
    visual: "heat",
    gif: CALCULATOR_GIFS.heating.animated,
    gifStill: CALCULATOR_GIFS.heating.still,
    span: "lg:col-span-5",
    band: "bg-rose-500",
    chip: "bg-rose-100 text-rose-800",
    iconWrap: "bg-rose-500 text-white",
    accentText: "text-rose-700",
    glow: "bg-rose-200/80",
    watermark: "text-rose-100",
    cardHover: "hover:border-rose-300",
    focusRing: "focus-visible:ring-rose-200",
    pageGlow: "from-rose-100/70",
    input: "focus:border-rose-500 focus:ring-rose-100",
    button: "bg-rose-600 hover:bg-rose-700 disabled:hover:bg-rose-600 focus-visible:ring-rose-200",
    skeleton: "bg-rose-100/80",
    softPanel: "border-rose-200/80 bg-rose-50",
  },
  "compound-interest": {
    number: "03",
    kicker: "Капітал",
    promise: "Час множить навіть невеликий внесок.",
    caption: "Зростання з кожним періодом",
    visual: "growth",
    gif: CALCULATOR_GIFS.compoundInterest.animated,
    gifStill: CALCULATOR_GIFS.compoundInterest.still,
    span: "lg:col-span-5",
    band: "bg-emerald-600",
    chip: "bg-emerald-100 text-emerald-800",
    iconWrap: "bg-emerald-600 text-white",
    accentText: "text-emerald-700",
    glow: "bg-emerald-200/80",
    watermark: "text-emerald-100",
    cardHover: "hover:border-emerald-300",
    focusRing: "focus-visible:ring-emerald-200",
    pageGlow: "from-emerald-100/70",
    input: "focus:border-emerald-500 focus:ring-emerald-100",
    button: "bg-emerald-700 hover:bg-emerald-800 disabled:hover:bg-emerald-700 focus-visible:ring-emerald-200",
    skeleton: "bg-emerald-100/80",
    softPanel: "border-emerald-200/80 bg-emerald-50",
  },
  salary: {
    number: "04",
    kicker: "Дохід",
    promise: "Одна цифра в офері — інша сума на руки.",
    caption: "Стандартні ставки: ПДФО 18%, збір 5%, ЄСВ 22%",
    visual: "salary",
    gif: CALCULATOR_GIFS.salary.animated,
    gifStill: CALCULATOR_GIFS.salary.still,
    span: "lg:col-span-7",
    band: "bg-indigo-600",
    chip: "bg-indigo-100 text-indigo-800",
    iconWrap: "bg-indigo-600 text-white",
    accentText: "text-indigo-700",
    glow: "bg-indigo-200/80",
    watermark: "text-indigo-100",
    cardHover: "hover:border-indigo-300",
    focusRing: "focus-visible:ring-indigo-200",
    pageGlow: "from-indigo-100/70",
    input: "focus:border-indigo-500 focus:ring-indigo-100",
    button: "bg-indigo-600 hover:bg-indigo-700 disabled:hover:bg-indigo-600 focus-visible:ring-indigo-200",
    skeleton: "bg-indigo-100/80",
    softPanel: "border-indigo-200/80 bg-indigo-50",
  },
};
