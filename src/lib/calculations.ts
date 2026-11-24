/* Pure calculation logic for all calculators (no React here). */

export type FieldRule<K extends string> = {
  key: K;
  label: string;
  hint?: string;
  min?: number;
  max?: number;
  /** Value must be strictly greater than this number. */
  gt?: number;
  integer?: boolean;
};

export type ParseResult<K extends string> =
  | { ok: true; values: Record<K, number> }
  | { ok: false; error: string };

/** Validates raw string inputs against rules and converts them to numbers. */
export function parseFields<K extends string>(
  raw: Record<K, string>,
  rules: FieldRule<K>[],
): ParseResult<K> {
  const values = {} as Record<K, number>;

  for (const rule of rules) {
    const text = raw[rule.key].trim().replace(",", ".");

    if (text === "") {
      return { ok: false, error: `Заповніть поле «${rule.label}».` };
    }

    const value = Number(text);

    if (!Number.isFinite(value)) {
      return { ok: false, error: `Поле «${rule.label}» має містити число.` };
    }
    if (rule.integer && !Number.isInteger(value)) {
      return { ok: false, error: `Поле «${rule.label}» має бути цілим числом.` };
    }
    if (rule.min !== undefined && value < rule.min) {
      return { ok: false, error: `Поле «${rule.label}» не може бути меншим за ${rule.min}.` };
    }
    if (rule.max !== undefined && value > rule.max) {
      return { ok: false, error: `Поле «${rule.label}» не може бути більшим за ${rule.max}.` };
    }
    if (rule.gt !== undefined && value <= rule.gt) {
      return { ok: false, error: `Поле «${rule.label}» має бути більшим за ${rule.gt}.` };
    }

    values[rule.key] = value;
  }

  return { ok: true, values };
}

/* ---------- 1. Fuel cost ---------- */

export type FuelInput = {
  distance: number;
  consumption: number;
  fuel_price: number;
};

export type FuelResult = {
  fuel_amount: number;
  total_cost: number;
};

export function calcFuel({ distance, consumption, fuel_price }: FuelInput): FuelResult {
  const fuel_amount = (distance * consumption) / 100;
  const total_cost = fuel_amount * fuel_price;
  return { fuel_amount, total_cost };
}

/* ---------- 2. Heating cost ---------- */

export type HeatingInput = {
  area: number;
  heat_consumption: number;
  efficiency: number;
  energy_price: number;
};

export type HeatingResult = {
  heat_demand: number;
  energy_consumption: number;
  total_cost: number;
};

export function calcHeating({
  area,
  heat_consumption,
  efficiency,
  energy_price,
}: HeatingInput): HeatingResult {
  const heat_demand = area * heat_consumption;
  // efficiency is given in percent, so it is divided by 100 before the calculation
  const energy_consumption = heat_demand / (efficiency / 100);
  const total_cost = energy_consumption * energy_price;
  return { heat_demand, energy_consumption, total_cost };
}

/* ---------- 3. Compound interest ---------- */

export type CompoundInput = {
  initial_amount: number;
  annual_rate: number;
  frequency: number;
  years: number;
};

export type CompoundResult = {
  final_amount: number;
  profit: number;
};

export function calcCompound({
  initial_amount,
  annual_rate,
  frequency,
  years,
}: CompoundInput): CompoundResult {
  const final_amount =
    initial_amount * Math.pow(1 + annual_rate / 100 / frequency, frequency * years);
  const profit = final_amount - initial_amount;
  return { final_amount, profit };
}

/* ---------- 4. Salary ---------- */

export type SalaryInput = {
  gross_salary: number;
  tax_rate: number;
  military_tax_rate: number;
  social_contribution_rate: number;
};

export type SalaryResult = {
  personal_income_tax: number;
  military_tax: number;
  net_salary: number;
  employer_social_contribution: number;
  total_employer_cost: number;
};

export function calcSalary({
  gross_salary,
  tax_rate,
  military_tax_rate,
  social_contribution_rate,
}: SalaryInput): SalaryResult {
  const personal_income_tax = (gross_salary * tax_rate) / 100;
  const military_tax = (gross_salary * military_tax_rate) / 100;
  const net_salary = gross_salary - personal_income_tax - military_tax;
  const employer_social_contribution = (gross_salary * social_contribution_rate) / 100;
  const total_employer_cost = gross_salary + employer_social_contribution;
  return {
    personal_income_tax,
    military_tax,
    net_salary,
    employer_social_contribution,
    total_employer_cost,
  };
}
