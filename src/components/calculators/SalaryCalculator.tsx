"use client";

import { calcSalary, type FieldRule, type SalaryResult } from "@/lib/calculations";
import { CALCULATOR_THEMES } from "@/lib/calculatorThemes";
import { formatNumber } from "@/lib/format";
import CalculatorShell, { ResultRow } from "./CalculatorShell";
import { useCalculator } from "./useCalculator";

type SalaryKey = "gross_salary" | "tax_rate" | "military_tax_rate" | "social_contribution_rate";

const FIELDS: FieldRule<SalaryKey>[] = [
  { key: "gross_salary", label: "Зарплата до оподаткування (грн)", min: 0 },
  { key: "tax_rate", label: "Ставка ПДФО (%)", min: 0, max: 100, hint: "Стандартна ставка — 18%." },
  {
    key: "military_tax_rate",
    label: "Ставка військового збору (%)",
    min: 0,
    max: 100,
    hint: "Стандартна ставка — 5%.",
  },
  {
    key: "social_contribution_rate",
    label: "Ставка ЄСВ (%)",
    min: 0,
    max: 100,
    hint: "Сплачує роботодавець. Стандартна ставка — 22%.",
  },
];

const DEFAULTS: Record<SalaryKey, string> = {
  gross_salary: "30000",
  tax_rate: "18",
  military_tax_rate: "5",
  social_contribution_rate: "22",
};

export default function SalaryCalculator() {
  const calc = useCalculator<SalaryKey, SalaryResult>(FIELDS, DEFAULTS, calcSalary);

  return (
    <CalculatorShell
      theme={CALCULATOR_THEMES.salary}
      fields={FIELDS}
      values={calc.values}
      onChange={calc.setField}
      onSubmit={calc.onSubmit}
      onReset={calc.onReset}
      error={calc.error}
      loading={calc.loading}
      result={
        calc.result && (
          <>
            <div className="pb-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Утримання з працівника</p>
            </div>
            <ResultRow
              label="Сума ПДФО (грн)"
              code="personal_income_tax"
              value={formatNumber(calc.result.personal_income_tax)}
            />
            <ResultRow
              label="Сума військового збору (грн)"
              code="military_tax"
              value={formatNumber(calc.result.military_tax)}
            />
            <ResultRow
              label="Зарплата на руки (грн)"
              code="net_salary"
              value={formatNumber(calc.result.net_salary)}
              highlight
            />
            <div className="pb-2 pt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Витрати роботодавця</p>
            </div>
            <ResultRow
              label="ЄСВ роботодавця (грн)"
              code="employer_social_contribution"
              value={formatNumber(calc.result.employer_social_contribution)}
            />
            <ResultRow
              label="Загальні витрати роботодавця (грн)"
              code="total_employer_cost"
              value={formatNumber(calc.result.total_employer_cost)}
              highlight
            />
          </>
        )
      }
    />
  );
}
