import type { Metadata } from "next";
import Image from "next/image";
import Icon from "@/components/Icon";
import { USEFUL_RESOURCES } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Корисні ресурси",
  description:
    "Добірка перевірених українських ресурсів з фінансової грамотності, економіки та управління особистими фінансами.",
};

export default function ResourcesPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16 sm:py-20">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Добірка платформ</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Корисні ресурси
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          Перевірені освітні портали, курси та матеріали для розвитку фінансової грамотності й
          розумного управління власним бюджетом.
        </p>
      </header>

      <ul className="mt-12 flex flex-col gap-5">
        {USEFUL_RESOURCES.map((resource) => (
          <li
            key={resource.id}
            className="group flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:border-blue-200 hover:shadow-md sm:flex-row sm:items-center sm:gap-6 sm:p-6"
          >
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Відкрити ${resource.name} (${resource.domain}) у новому вікні`}
              className="relative block aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50 transition hover:opacity-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 sm:w-40"
            >
              <Image
                src={resource.image}
                alt={`Перейти на ресурс ${resource.name}`}
                fill
                unoptimized
                sizes="(min-width: 640px) 160px, 100vw"
                className="object-cover transition duration-300 group-hover:scale-105"
              />
            </a>

            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-semibold text-slate-950">{resource.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                {resource.description}
              </p>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
              >
                <span>{resource.domain}</span>
                <Icon name="external" className="size-4" />
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
