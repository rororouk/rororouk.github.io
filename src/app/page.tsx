import Link from "next/link";
import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import CalculatorShowcase from "@/components/CalculatorShowcase";
import ParallaxCircles from "@/components/ParallaxCircles";
import { getArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: { absolute: "Рахівник — онлайн-калькулятори для щоденних завдань" },
  description:
    "Онлайн-калькулятори для щоденних завдань: вартість пального, витрати на опалення, складні відсотки та зарплата на руки.",
};

const BUTTON_PRIMARY =
  "inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200";

const BUTTON_SECONDARY =
  "inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-200";

export default function HomePage() {
  // Only the two most recent articles are shown on the home page.
  const latestArticles = getArticles().slice(0, 2);

  return (
    <>
      <ParallaxCircles />

      <div>
        {/* Minimal header: gradient only, no photos */}
        <section className="bg-linear-to-b from-blue-100/70 via-blue-50/40 to-transparent">
          <div className="mx-auto max-w-6xl px-6 pt-16 pb-12 sm:pt-24 sm:pb-16">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-3 py-1 text-xs font-medium text-blue-700">
                <span className="size-1.5 rounded-full bg-blue-600" />
                Онлайн-сервіс калькуляторів
              </span>

              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">Рахівник</h1>
              <p className="mt-4 text-xl font-medium text-slate-800 sm:text-2xl">
                Онлайн-калькулятори для щоденних завдань
              </p>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Швидко порахуйте витрати на пальне для поїздки, вартість опалення помешкання, зростання
                накопичень і структуру зарплати. Введіть дані, натисніть «Розрахувати» — і результат
                готовий. Жодних реєстрацій чи складних формул: усі обчислення виконуються прямо у
                вашому браузері.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#services" className={BUTTON_PRIMARY}>
                  Обрати калькулятор
                </a>
                <Link href="/blog" className={BUTTON_SECONDARY}>
                  Читати блог
                </Link>
              </div>
            </div>
          </div>
        </section>

        <CalculatorShowcase />

        {/* Blog preview */}
        <section id="blog" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Блог</h2>
              <p className="mt-3 text-slate-600">
                Корисні поради про економію пального, утеплення, накопичення та податки на зарплату.
              </p>
            </div>
            <Link href="/blog" className="text-sm font-semibold text-blue-600 transition hover:text-blue-800">
              Усі статті →
            </Link>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {latestArticles.map((article) => (
              <BlogCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
