import type { Metadata } from "next";
import { AUTHOR_IMAGES } from "@/assets/authorImages";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Автор",
  description: "Інформація про автора сайту Рахівник та зауваження до лабораторної роботи.",
};

const LINK_CLASS =
  "break-all text-base font-medium text-blue-700 underline-offset-4 transition hover:text-blue-900 hover:underline";

export default function AuthorPage() {
  return (
    <div className="relative isolate flex flex-1 w-full flex-col overflow-hidden">
      {/* Semi-transparent background image covering the full page area */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src={AUTHOR_IMAGES.background}
          alt=""
          fill
          unoptimized
          priority
          sizes="100vw"
          className="object-cover object-center opacity-[0.12]"
        />
      </div>

      <div className="mx-auto w-full max-w-4xl px-6 py-16 sm:py-24">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Про автора</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Автор</h1>
        </header>

        <section
          aria-labelledby="author-name"
          className="mt-12 grid gap-8 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur sm:grid-cols-[240px_1fr] sm:p-8"
        >
          <div className="relative mx-auto aspect-square w-full max-w-[240px] overflow-hidden rounded-2xl bg-slate-100">
            <Image
              src={AUTHOR_IMAGES.photo}
              alt="Фотокартка автора у стилі інкогніто"
              fill
              unoptimized
              sizes="240px"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h2 id="author-name" className="text-2xl font-semibold text-slate-950 sm:text-3xl">
              Скорохо Роман Андрійович
            </h2>

            <dl className="mt-8 space-y-6">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">E-mail</dt>
                <dd className="mt-1.5">
                  <a href="mailto:skorokhod.edu@gmail.com" className={LINK_CLASS}>
                    skorokhod.edu@gmail.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">LinkedIn</dt>
                <dd className="mt-1.5">
                  <a
                    href="https://www.linkedin.com/in/roman-skorokhod-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={LINK_CLASS}
                  >
                    www.linkedin.com/in/roman-skorokhod-dev
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section
          aria-labelledby="lab-remarks"
          className="mt-10 rounded-3xl border border-blue-100 border-l-4 border-l-blue-600 bg-blue-50/90 p-6 shadow-sm backdrop-blur sm:p-8"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Зауваження до лабораторної
          </p>
          <h2 id="lab-remarks" className="mt-2 text-xl font-semibold text-slate-900">
            Побажання
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            На мою думку, до лабораторної роботи доцільно додати чітко сформульовану мету. Крім того,
            варто передбачити невеликий теоретичний розділ із базовими поняттями та відомостями, які
            допоможуть студентам краще зрозуміти тему й полегшать виконання практичних завдань.
          </p>
        </section>
      </div>
    </div>
  );
}
