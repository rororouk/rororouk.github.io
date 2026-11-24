import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleBody from "@/components/ArticleBody";
import Icon from "@/components/Icon";
import { ARTICLES, getArticle } from "@/lib/articles";
import { getCalculator } from "@/lib/calculators";
import { formatDate } from "@/lib/format";

// Only pre-rendered slugs are allowed; unknown slugs return 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return { title: "Сторінку не знайдено" };
  }

  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  const calc = getCalculator(article.calculatorSlug);

  return (
    <article className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
      <nav aria-label="Навігація сторінкою">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
        >
          <Icon name="arrow" className="size-4 rotate-180" />
          До блогу
        </Link>
      </nav>

      <header className="mt-8 border-b border-slate-200 pb-10">
        <time dateTime={article.date} className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          {formatDate(article.date)}
        </time>
        <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-4xl">
          {article.title}
        </h1>
      </header>

      {article.banner && (
        <figure className="mt-10 overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
          <div className="relative aspect-[4/1] w-full">
            <Image
              src={article.banner.src}
              alt={article.banner.alt}
              fill
              unoptimized
              priority
              sizes="(min-width: 896px) 53rem, 100vw"
              className="object-cover"
            />
          </div>
        </figure>
      )}

      <div className="mt-12 text-base leading-8 text-slate-700 sm:text-lg sm:leading-9">
        <ArticleBody blocks={article.blocks} />
      </div>

      {calc && (
        <aside className="clear-both mt-20 rounded-2xl border border-blue-100 bg-linear-to-br from-blue-50 to-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold text-blue-700">Практика</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">Розрахуйте самостійно</h2>
          <p className="mt-2 leading-relaxed text-slate-600">
            Перейдіть до калькулятора та порахуйте результат для ваших власних даних.
          </p>
          <Link
            href={`/calculators/${calc.slug}`}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            {calc.name}
            <Icon name="arrow" className="size-4" />
          </Link>
        </aside>
      )}
    </article>
  );
}
