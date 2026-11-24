import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Рахівник — онлайн-калькулятори для щоденних завдань",
    template: "%s | Рахівник",
  },
  description:
    "Рахівник — онлайн-калькулятори для щоденних завдань: вартість пального, витрати на опалення, складні відсотки та зарплата на руки.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk">
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased">
        <Navbar />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
