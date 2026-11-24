import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import CompoundInterestCalculator from "@/components/calculators/CompoundInterestCalculator";
import FuelCalculator from "@/components/calculators/FuelCalculator";
import HeatingCalculator from "@/components/calculators/HeatingCalculator";
import SalaryCalculator from "@/components/calculators/SalaryCalculator";
import { getArticle } from "@/lib/articles";
import { CALCULATORS, getCalculator, type CalculatorSlug } from "@/lib/calculators";

const FORMS: Record<CalculatorSlug, ComponentType> = {
  fuel: FuelCalculator,
  heating: HeatingCalculator,
  "compound-interest": CompoundInterestCalculator,
  salary: SalaryCalculator,
};

// Pre-render every calculator page at build time; unknown slugs return 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return CALCULATORS.map((calc) => ({ slug: calc.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const calc = getCalculator(slug);

  if (!calc) {
    return { title: "Сторінку не знайдено" };
  }

  return { title: calc.name, description: calc.description };
}

export default async function CalculatorPage({ params }: Props) {
  const { slug } = await params;
  const calc = getCalculator(slug);

  if (!calc) {
    notFound();
  }

  const Form = FORMS[calc.slug];

  return (
    <CalculatorLayout calc={calc} article={getArticle(calc.articleSlug)}>
      <Form />
    </CalculatorLayout>
  );
}
