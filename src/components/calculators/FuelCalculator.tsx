"use client";

import { calcFuel, type FieldRule, type FuelResult } from "@/lib/calculations";
import { CALCULATOR_THEMES } from "@/lib/calculatorThemes";
import { formatNumber } from "@/lib/format";
import CalculatorShell, { ResultRow } from "./CalculatorShell";
import { useCalculator } from "./useCalculator";

type FuelKey = "distance" | "consumption" | "fuel_price";

const FIELDS: FieldRule<FuelKey>[] = [
  { key: "distance", label: "Відстань (км)", min: 0 },
  { key: "consumption", label: "Витрата пального (л / 100 км)", min: 0 },
  { key: "fuel_price", label: "Ціна пального (грн / л)", min: 0 },
];

const DEFAULTS: Record<FuelKey, string> = {
  distance: "350",
  consumption: "7.5",
  fuel_price: "52",
};

export default function FuelCalculator() {
  const calc = useCalculator<FuelKey, FuelResult>(FIELDS, DEFAULTS, calcFuel);

  return (
    <CalculatorShell
      theme={CALCULATOR_THEMES.fuel}
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
              label="Необхідна кількість пального (л)"
              code="fuel_amount"
              value={formatNumber(calc.result.fuel_amount)}
            />
            <ResultRow
              label="Загальна вартість поїздки (грн)"
              code="total_cost"
              value={formatNumber(calc.result.total_cost)}
              highlight
            />
          </>
        )
      }
    />
  );
}
