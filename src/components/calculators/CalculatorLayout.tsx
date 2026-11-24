import Link from "next/link";
import type { ReactNode } from "react";
import CalculatorVisual from "@/components/CalculatorVisual";
import Icon from "@/components/Icon";
import type { Article } from "@/lib/articles";
import { CALCULATOR_THEMES } from "@/lib/calculatorThemes";
import type { CalculatorMeta } from "@/lib/calculators";

type Props = {
  calc: CalculatorMeta;
  article?: Article;
  children: ReactNode;
};

/**
 * Shared page frame for every calculator. It reuses the visual identity of the matching
 * card on the home page (colour band, kicker, icon, number, signature visual).
 */
export default function CalculatorLayout({ calc, article, children }: Props) {
  const theme = CALCULATOR_THEMES[calc.slug];

  return (
    <div className="relative isolate">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem] bg-linear-to-b ${theme.pageGlow} to-transparent`}
      />

      <div className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
        <nav aria-label="Навігація сторінкою" className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="transition hover:text-slate-900">
            Сервіси
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/#services" className="transition hover:text-slate-900">
            Калькулятори
          </Link>
          <span aria-hidden="true">/</span>
          <span className={`font-medium ${theme.accentText}`}>{theme.kicker}</span>
        </nav>

        {/* Compact header — mirrors the calculator card on the home page */}
        <header className="relative mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <span className={`block h-1.5 ${theme.band}`} />
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute -top-10 -right-8 size-44 rounded-full blur-2xl ${theme.glow}`}
          />
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute top-6 right-7 hidden font-mono text-7xl font-semibold tracking-tight select-none sm:block ${theme.watermark}`}
          >
            {theme.number}
          </span>

          <div className="relative flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-8">
            <span className="relative block size-20 shrink-0 overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5 sm:size-22">
              {/* Data URIs contain commas, so two plain <img> tags are safer than srcSet. */}
              <img
                src={theme.gif}
                alt=""
                width={88}
                height={88}
                decoding="async"
                className="absolute inset-0 size-full object-cover motion-reduce:hidden"
              />
              <img
                src={theme.gifStill}
                alt=""
                width={88}
                height={88}
                decoding="async"
                className="absolute inset-0 hidden size-full object-cover motion-reduce:block"
              />
            </span>
            <div className="sm:pr-32">
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${theme.chip}`}>
                {theme.kicker}
              </span>
              <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{calc.name}</h1>
              <p className={`mt-2 text-base font-medium sm:text-lg ${theme.accentText}`}>{theme.promise}</p>
            </div>
          </div>
        </header>

        <section className="mt-6 grid gap-6 lg:grid-cols-12">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-7">
            <h2 className="text-lg font-semibold text-slate-900">Загальний опис</h2>
            {calc.overview.map((paragraph) => (
              <p key={paragraph} className="mt-3 leading-relaxed text-slate-600">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="flex flex-col justify-center rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-5">
            <p className="mb-3 text-xs font-semibold tracking-wide text-slate-500 uppercase">{theme.caption}</p>
            <CalculatorVisual kind={theme.visual} />
          </div>
        </section>

        <div className="mt-6">{children}</div>

        {article && (
          <aside
            aria-label="Корисна стаття"
            className={`relative mt-10 overflow-hidden rounded-3xl border p-6 sm:p-8 ${theme.softPanel}`}
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
              <span className={`grid size-14 shrink-0 place-items-center rounded-2xl shadow-sm ${theme.iconWrap}`}>
                <Icon name={calc.icon} className="size-7" />
              </span>

              <div className="min-w-0 flex-1">
                <p className={`text-sm font-semibold ${theme.accentText}`}>Корисна стаття</p>
                <p className="mt-1 text-lg font-semibold leading-snug text-slate-900">{article.title}</p>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-slate-600">{article.excerpt}</p>
              </div>

              <Link
                href={`/blog/${article.slug}`}
                className={`inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition focus:outline-none focus-visible:ring-4 sm:self-center ${theme.button}`}
              >
                Читати статтю
                <Icon name="arrow" className="size-4" />
              </Link>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
