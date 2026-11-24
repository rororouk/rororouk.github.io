"use client";

import { calcHeating, type FieldRule, type HeatingResult } from "@/lib/calculations";
import { CALCULATOR_THEMES } from "@/lib/calculatorThemes";
import { formatNumber } from "@/lib/format";
import CalculatorShell, { ResultRow } from "./CalculatorShell";
import { useCalculator } from "./useCalculator";

type HeatingKey = "area" | "heat_consumption" | "efficiency" | "energy_price";

const FIELDS: FieldRule<HeatingKey>[] = [
  { key: "area", label: "Площа приміщення (м²)", min: 0 },
  { key: "heat_consumption", label: "Потреба в теплі (кВт·год / м² за місяць)", min: 0 },
  {
    key: "efficiency",
    label: "ККД системи опалення (%)",
    gt: 0,
    max: 100,
    hint: "Перед обчисленням значення ділиться на 100. Наприклад, для ККД 90% введіть 90.",
  },
  { key: "energy_price", label: "Вартість 1 кВт·год (грн)", min: 0 },
];

const DEFAULTS: Record<HeatingKey, string> = {
  area: "60",
  heat_consumption: "20",
  efficiency: "90",
  energy_price: "4.32",
};

export default function HeatingCalculator() {
  const calc = useCalculator<HeatingKey, HeatingResult>(FIELDS, DEFAULTS, calcHeating);

  return (
    <CalculatorShell
      theme={CALCULATOR_THEMES.heating}
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
              label="Потреба в тепловій енергії (кВт·год)"
              code="heat_demand"
              value={formatNumber(calc.result.heat_demand)}
            />
            <ResultRow
              label="Споживання енергії (кВт·год)"
              code="energy_consumption"
              value={formatNumber(calc.result.energy_consumption)}
            />
            <ResultRow
              label="Загальна вартість опалення (грн)"
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
