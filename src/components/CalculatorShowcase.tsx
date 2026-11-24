import Link from "next/link";
import CalculatorVisual from "@/components/CalculatorVisual";
import Icon from "@/components/Icon";
import { CALCULATOR_THEMES } from "@/lib/calculatorThemes";
import { CALCULATORS } from "@/lib/calculators";

export default function CalculatorShowcase() {
  return (
    <section id="services" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-12 sm:py-16">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Сервіси</h2>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          Дорога, дім, капітал і зарплата — чотири різні задачі. Кожен інструмент має власну логіку:
          оберіть картку й отримайте розрахунок за кілька секунд.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-12">
        {CALCULATORS.map((calc) => {
          const theme = CALCULATOR_THEMES[calc.slug];
          return (
            <Link
              key={calc.slug}
              href={`/calculators/${calc.slug}`}
              className={`group relative flex min-h-[340px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)] focus:outline-none focus-visible:ring-4 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${theme.span} ${theme.cardHover} ${theme.focusRing}`}
            >
              <span className={`h-1.5 ${theme.band}`} />
              <span className={`pointer-events-none absolute -top-10 -right-8 size-40 rounded-full blur-2xl ${theme.glow}`} />
              <span
                className={`pointer-events-none absolute top-8 right-6 font-mono text-6xl font-semibold tracking-tight select-none ${theme.watermark}`}
                aria-hidden="true"
              >
                {theme.number}
              </span>

              <div className="relative flex flex-1 flex-col p-7 sm:p-9">
                <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${theme.chip}`}>
                  {theme.kicker}
                </span>
                <span className={`mt-6 grid size-14 place-items-center rounded-2xl ${theme.iconWrap}`}>
                  <Icon name={calc.icon} className="size-7" />
                </span>
                <h3 className="mt-5 max-w-md text-2xl font-semibold leading-snug text-slate-950">{calc.name}</h3>
                <p className={`mt-3 text-base font-medium ${theme.accentText}`}>{theme.promise}</p>
                <p className="mt-3 max-w-md flex-1 text-sm leading-relaxed text-slate-600">{calc.description}</p>
                <span className={`mt-6 inline-flex items-center gap-1.5 text-sm font-semibold ${theme.accentText}`}>
                  Відкрити калькулятор
                  <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
                </span>

                <div className="mt-8">
                  <p className="mb-3 text-xs font-semibold tracking-wide text-slate-500 uppercase">{theme.caption}</p>
                  <CalculatorVisual kind={theme.visual} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
