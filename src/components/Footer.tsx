import Link from "next/link";
import Logo from "@/components/Logo";
import { CALCULATORS } from "@/lib/calculators";

const SITE_LINKS = [
  { href: "/", label: "Сервіси" },
  { href: "/blog", label: "Блог" },
  { href: "/resources", label: "Корисні ресурси" },
  { href: "/author", label: "Автор" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 sm:grid-cols-3">
        <div>
          <Link href="/" className="inline-block">
            <Logo size="sm" />
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Онлайн-калькулятори для щоденних завдань.
          </p>
        </div>

        <nav aria-label="Калькулятори">
          <p className="text-sm font-semibold text-slate-900">Калькулятори</p>
          <ul className="mt-3 space-y-2">
            {CALCULATORS.map((calc) => (
              <li key={calc.slug}>
                <Link href={`/calculators/${calc.slug}`} className="text-sm text-slate-600 transition hover:text-blue-700">
                  {calc.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Розділи сайту">
          <p className="text-sm font-semibold text-slate-900">Сайт</p>
          <ul className="mt-3 space-y-2">
            {SITE_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-slate-600 transition hover:text-blue-700">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-slate-100 py-4 text-center text-xs text-slate-500">
        © 2026 Рахівник. Усі права захищено.
      </div>
    </footer>
  );
}
