"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Icon from "@/components/Icon";
import Logo from "@/components/Logo";

const NAV_ITEMS = [
  { href: "/", label: "Сервіси" },
  { href: "/blog", label: "Блог" },
  { href: "/resources", label: "Корисні ресурси" },
  { href: "/author", label: "Автор" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname.startsWith("/calculators");
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const linkClass = (href: string, mobile: boolean) =>
    `rounded-lg text-sm font-medium transition ${
      mobile ? "block px-4 py-3" : "px-4 py-2"
    } ${
      isActive(href)
        ? "bg-blue-50 text-blue-700"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="rounded-xl transition hover:opacity-90 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
        >
          <Logo />
        </Link>

        <nav aria-label="Головна навігація" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={linkClass(item.href, false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Закрити меню" : "Відкрити меню"}
          className="grid size-10 place-items-center rounded-lg text-slate-700 transition hover:bg-slate-100 md:hidden"
        >
          <Icon name={open ? "close" : "menu"} className="size-5" />
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Мобільна навігація" className="border-t border-slate-200 bg-white md:hidden">
          <ul className="mx-auto max-w-6xl px-6 py-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={linkClass(item.href, true)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
