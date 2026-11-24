import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Помилка 404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        Сторінку не знайдено
      </h1>
      <p className="mt-4 text-slate-600">Можливо, посилання застаріло або сторінку було переміщено.</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
      >
        На головну
      </Link>
    </div>
  );
}
