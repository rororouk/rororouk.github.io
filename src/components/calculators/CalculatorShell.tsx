import type { FormEvent, ReactNode } from "react";
import type { FieldRule } from "@/lib/calculations";
import type { CalculatorTheme } from "@/lib/calculatorThemes";

const BUTTON_PRIMARY =
  "inline-flex min-w-44 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-sm transition focus:outline-none focus-visible:ring-4 disabled:cursor-wait disabled:opacity-90";

const BUTTON_SECONDARY =
  "inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-200";

const INPUT =
  "mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:ring-4";

type CalculatorShellProps<K extends string> = {
  theme: CalculatorTheme;
  fields: FieldRule<K>[];
  values: Record<K, string>;
  onChange: (key: K) => (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
  error: string | null;
  loading: boolean;
  result: ReactNode;
};

/** Generic form + result layout used by every calculator, painted in the calculator's theme. */
export default function CalculatorShell<K extends string>({
  theme,
  fields,
  values,
  onChange,
  onSubmit,
  onReset,
  error,
  loading,
  result,
}: CalculatorShellProps<K>) {
  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <form
        noValidate
        onSubmit={onSubmit}
        aria-busy={loading}
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-3"
      >
        <div className="flex items-center gap-3">
          <StepBadge className={theme.chip}>1</StepBadge>
          <h2 className="text-lg font-semibold text-slate-900">Вхідні дані</h2>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {fields.map((field) => (
            <div key={field.key}>
              <label htmlFor={field.key} className="block text-sm font-medium text-slate-700">
                {field.label}
              </label>
              <input
                id={field.key}
                name={field.key}
                type="number"
                inputMode="decimal"
                step={field.integer ? 1 : "any"}
                min={field.min}
                max={field.max}
                value={values[field.key]}
                onChange={(event) => onChange(field.key)(event.target.value)}
                className={`${INPUT} ${theme.input}`}
              />
              {field.hint && <p className="mt-2 text-xs leading-relaxed text-slate-500">{field.hint}</p>}
            </div>
          ))}
        </div>

        {error && (
          <p role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <button type="submit" className={`${BUTTON_PRIMARY} ${theme.button}`} disabled={loading}>
            {loading ? (
              <>
                <Spinner />
                Розрахунок…
              </>
            ) : (
              "Розрахувати"
            )}
          </button>
          <button type="button" onClick={onReset} className={BUTTON_SECONDARY}>
            Скинути
          </button>
        </div>
      </form>

      <aside
        aria-live="polite"
        aria-busy={loading}
        className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:sticky lg:top-24 lg:col-span-2 lg:self-start"
      >
        <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1.5 ${theme.band}`} />
        <div className="flex items-center gap-3">
          <StepBadge className={theme.chip}>2</StepBadge>
          <h2 className="text-lg font-semibold text-slate-900">Результат</h2>
        </div>

        {loading ? (
          <div className="mt-6">
            <p className="text-sm font-medium text-slate-700">Завантаження даних…</p>
            <div className="mt-4 space-y-3" aria-hidden="true">
              <div className={`h-3 w-2/3 animate-pulse rounded ${theme.skeleton}`} />
              <div className={`h-8 w-1/2 animate-pulse rounded ${theme.skeleton}`} />
              <div className={`h-3 w-5/6 animate-pulse rounded ${theme.skeleton}`} />
              <div className={`h-8 w-2/5 animate-pulse rounded ${theme.skeleton}`} />
            </div>
          </div>
        ) : result ? (
          // Highlighted values inherit the accent colour from this wrapper.
          <div className={`mt-5 divide-y divide-slate-100 ${theme.accentText}`}>{result}</div>
        ) : (
          <p className="mt-5 text-sm leading-relaxed text-slate-500">
            Введіть дані у форму та натисніть «Розрахувати», щоб побачити результат.
          </p>
        )}
      </aside>
    </div>
  );
}

function StepBadge({ className, children }: { className: string; children: ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold ${className}`}
    >
      {children}
    </span>
  );
}

function Spinner() {
  return (
    <svg className="size-4 motion-safe:animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" />
      <path
        className="opacity-90"
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

type ResultRowProps = {
  label: string;
  code: string;
  value: string;
  highlight?: boolean;
};

/**
 * One line of the calculation result, with the variable name for traceability.
 * Highlighted values take the theme accent colour from the parent result block.
 */
export function ResultRow({ label, code, value, highlight = false }: ResultRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
      <div>
        <p className="text-sm text-slate-600">{label}</p>
        <p className="mt-0.5 font-mono text-[11px] text-slate-400">{code}</p>
      </div>
      <p
        className={`shrink-0 text-right font-semibold tabular-nums ${
          highlight ? "text-xl" : "text-base text-slate-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
