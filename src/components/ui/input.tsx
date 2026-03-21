import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function Input({ label, id, error, className = "", ...rest }: Props) {
  const inputId = id ?? rest.name;
  return (
    <label className="flex flex-col gap-2 text-sm text-green/80" htmlFor={inputId}>
      <span className="font-medium">{label}</span>
      <input
        id={inputId}
        className={`rounded-[16px] border border-green/15 bg-cream/60 px-4 py-3 text-fg placeholder:text-fg/35 focus:border-green/35 focus:outline-none focus:ring-2 focus:ring-green/15 ${className}`}
        {...rest}
      />
      {error ? <span className="text-xs text-red-800/80">{error}</span> : null}
    </label>
  );
}
