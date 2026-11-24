import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/articles";
import { formatDate } from "@/lib/format";

export default function BlogCard({ article }: { article: Article }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
        <Image
          src={article.poster}
          alt={article.posterAlt}
          fill
          unoptimized
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <time dateTime={article.date} className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          {formatDate(article.date)}
        </time>
        <h3 className="mt-3 text-xl font-semibold leading-snug text-slate-900">{article.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{article.excerpt}</p>
        <div className="mt-6">
          <Link
            href={`/blog/${article.slug}`}
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
          >
            Детальніше
          </Link>
        </div>
      </div>
    </article>
  );
}
