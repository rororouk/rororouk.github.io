import { useEffect, useRef, useState, type FormEvent } from "react";
import { parseFields, type FieldRule } from "@/lib/calculations";

const LOADING_DELAY_MS = 1000;

/**
 * Shared state for a calculator form. The result is calculated only when the form is
 * submitted (the «Розрахувати» button). A successful submit first shows a one-second
 * loading state, so the calculation feels like data is being fetched.
 */
export function useCalculator<K extends string, R>(
  rules: FieldRule<K>[],
  defaults: Record<K, string>,
  compute: (values: Record<K, number>) => R,
) {
  const [values, setValues] = useState<Record<K, string>>(defaults);
  const [result, setResult] = useState<R | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRef = useRef(false);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const setField = (key: K) => (value: string) => {
    setValues((previous) => ({ ...previous, [key]: value }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pendingRef.current) return;

    const parsed = parseFields(values, rules);

    if (!parsed.ok) {
      clearTimer();
      pendingRef.current = false;
      setLoading(false);
      setResult(null);
      setError(parsed.error);
      return;
    }

    setError(null);
    setResult(null);
    setLoading(true);
    pendingRef.current = true;
    clearTimer();

    timerRef.current = setTimeout(() => {
      setResult(compute(parsed.values));
      setLoading(false);
      pendingRef.current = false;
      timerRef.current = null;
    }, LOADING_DELAY_MS);
  };

  const onReset = () => {
    clearTimer();
    pendingRef.current = false;
    setLoading(false);
    setValues(defaults);
    setResult(null);
    setError(null);
  };

  return { values, setField, onSubmit, onReset, result, error, loading };
}
