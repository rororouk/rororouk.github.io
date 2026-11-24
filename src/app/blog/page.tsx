import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import { getArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Блог",
  description:
    "Статті Рахівника: як зменшити витрати пального та тепловтрати, як працюють складні відсотки і з чого складається зарплата.",
};

export default function BlogPage() {
  const articles = getArticles();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Блог Рахівника</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Блог</h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          Практичні статті про витрати, накопичення та податки. Кожна стаття пов’язана з відповідним
          калькулятором, щоб одразу перевірити розрахунки на власних даних.
        </p>
      </header>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {articles.map((article) => (
          <BlogCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
