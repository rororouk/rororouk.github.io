import type { CalculatorVisualKind } from "@/lib/calculatorThemes";

/**
 * Small illustrative "signature" of each calculator. Shared by the card on the home page
 * and by the calculator page, so both places look like the same tool.
 */
export default function CalculatorVisual({ kind }: { kind: CalculatorVisualKind }) {
  if (kind === "route") return <RouteVisual />;
  if (kind === "heat") return <HeatVisual />;
  if (kind === "growth") return <GrowthVisual />;
  return <SalaryVisual />;
}

function RouteVisual() {
  return (
    <div aria-hidden="true" className="rounded-2xl bg-amber-50 px-5 py-4">
      <div className="flex items-center gap-2">
        <span className="size-3 shrink-0 rounded-full bg-amber-500 ring-4 ring-amber-200" />
        <span className="h-px flex-1 border-t border-dashed border-amber-300" />
        <span className="size-3 shrink-0 rounded-full bg-amber-500 ring-4 ring-amber-200" />
        <span className="h-px flex-1 border-t border-dashed border-amber-300" />
        <span className="rounded-full bg-amber-500 px-2.5 py-1 text-xs font-semibold text-white">грн</span>
      </div>
      <div className="mt-3 flex justify-between text-xs font-medium text-amber-900">
        <span>Старт</span>
        <span>Маршрут</span>
        <span>Сума</span>
      </div>
    </div>
  );
}

function HeatVisual() {
  const bars = [
    { label: "Стіни", height: "72%" },
    { label: "Дах", height: "100%" },
    { label: "Вікна", height: "56%" },
    { label: "Двері", height: "34%" },
    { label: "Підлога", height: "46%" },
  ];

  return (
    <div aria-hidden="true" className="rounded-2xl bg-rose-50 px-4 py-4">
      <div className="flex items-end justify-between gap-2">
        {bars.map((bar) => (
          <div key={bar.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-16 w-full items-end">
              <div className="w-full rounded-t-md bg-rose-400" style={{ height: bar.height }} />
            </div>
            <span className="text-center text-[10px] leading-tight font-medium text-rose-800 sm:text-xs">{bar.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GrowthVisual() {
  const heights = ["24%", "38%", "50%", "66%", "82%", "100%"];

  return (
    <div aria-hidden="true" className="rounded-2xl bg-emerald-50 px-4 py-4">
      <div className="flex h-20 items-end gap-1.5">
        {heights.map((height, index) => (
          <div key={height} className="flex-1 rounded-t-md bg-emerald-500" style={{ height, opacity: 0.45 + index * 0.1 }} />
        ))}
      </div>
      <div className="mt-3 flex justify-between text-xs font-medium text-emerald-900">
        <span>Сьогодні</span>
        <span>Роки потому</span>
      </div>
    </div>
  );
}

function SalaryVisual() {
  const rows = [
    { label: "Gross", width: "100%", note: "нараховано" },
    { label: "Net", width: "77%", note: "на руки" },
    { label: "ЄСВ", width: "22%", note: "понад Gross" },
  ];

  return (
    <div aria-hidden="true" className="space-y-2.5 rounded-2xl bg-indigo-50 px-4 py-4">
      {rows.map((row) => (
        <div key={row.label} className="grid grid-cols-[3.4rem_1fr_auto] items-center gap-3 text-xs">
          <span className="font-semibold text-indigo-950">{row.label}</span>
          <span className="h-2 overflow-hidden rounded-full bg-indigo-100">
            <span className="block h-full rounded-full bg-indigo-500" style={{ width: row.width }} />
          </span>
          <span className="text-right text-indigo-700">{row.note}</span>
        </div>
      ))}
    </div>
  );
}
