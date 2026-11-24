"use client";

import { calcCompound, type CompoundResult, type FieldRule } from "@/lib/calculations";
import { CALCULATOR_THEMES } from "@/lib/calculatorThemes";
import { formatNumber } from "@/lib/format";
import CalculatorShell, { ResultRow } from "./CalculatorShell";
import { useCalculator } from "./useCalculator";

type CompoundKey = "initial_amount" | "annual_rate" | "frequency" | "years";

const FIELDS: FieldRule<CompoundKey>[] = [
  { key: "initial_amount", label: "Початкова сума (грн)", min: 0 },
  { key: "annual_rate", label: "Річна процентна ставка (%)", min: 0 },
  {
    key: "frequency",
    label: "Кількість нарахувань відсотків на рік",
    integer: true,
    min: 1,
    hint: "Наприклад: 1 — щорічно, 4 — щоквартально, 12 — щомісяця, 365 — щодня.",
  },
  { key: "years", label: "Термін інвестування (роки)", min: 0 },
];

const DEFAULTS: Record<CompoundKey, string> = {
  initial_amount: "50000",
  annual_rate: "12",
  frequency: "12",
  years: "10",
};

export default function CompoundInterestCalculator() {
  const calc = useCalculator<CompoundKey, CompoundResult>(FIELDS, DEFAULTS, calcCompound);

  return (
    <CalculatorShell
      theme={CALCULATOR_THEMES["compound-interest"]}
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
            <ResultRow
              label="Кінцева сума (грн)"
              code="final_amount"
              value={formatNumber(calc.result.final_amount)}
              highlight
            />
            <ResultRow
              label="Прибуток від відсотків (грн)"
              code="profit"
              value={formatNumber(calc.result.profit)}
            />
          </>
        )
      }
    />
  );
}
