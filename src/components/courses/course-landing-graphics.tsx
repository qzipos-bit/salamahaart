const stroke = "currentColor";
const common =
  "h-11 w-11 shrink-0 rounded-2xl border border-green/15 bg-cream/80 p-2.5 text-green shadow-[var(--shadow-sm)]";

export function ValuePropIcon({ name }: { name: string }) {
  switch (name) {
    case "shield":
      return (
        <span className={common} aria-hidden>
          <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
            <path
              d="M12 2 4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3Z"
              stroke={stroke}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="m9 12 2 2 4-4"
              stroke={stroke}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      );
    case "users":
      return (
        <span className={common} aria-hidden>
          <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
            <path
              d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
              stroke={stroke}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="9" cy="7" r="4" stroke={stroke} strokeWidth="1.5" />
            <path
              d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
              stroke={stroke}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      );
    case "sparkle":
      return (
        <span className={common} aria-hidden>
          <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
            <path
              d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z"
              stroke={stroke}
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
            <path
              d="M5 3v4M3 5h4M19 17v4M17 19h4"
              stroke={stroke}
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      );
    case "layers":
    default:
      return (
        <span className={common} aria-hidden>
          <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
            <path
              d="m12.83 2.18 8 3.08a1 1 0 0 1 0 1.87l-8 3.09a2 2 0 0 1-1.66 0l-8-3.1a1 1 0 0 1 0-1.86l8-3.08a2 2 0 0 1 1.66 0Z"
              stroke={stroke}
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            <path
              d="m2.62 11.15 8.21 3.17a2 2 0 0 0 1.54 0l8.11-3.13M2.62 16.15l8.21 3.17a2 2 0 0 0 1.54 0l8.11-3.13"
              stroke={stroke}
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </span>
      );
  }
}

/** Декоративный макет сертификата под фирменные цвета (без растровых картинок). */
export function CertificatePreview({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[var(--radius-lg)] border border-gold/35 bg-gradient-to-b from-cream via-cream to-sage-muted/50 p-6 shadow-[var(--shadow)] sm:p-8 ${className}`}
      role="img"
      aria-label="Оформление сертификата курса: рамка, типографика, подпись мастерской"
    >
      <div
        className="pointer-events-none absolute inset-3 rounded-xl border-2 border-gold/30 sm:inset-4"
        aria-hidden
      />
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-green/5 blur-3xl" />

      <div className="relative flex min-h-[280px] flex-col items-center justify-center text-center sm:min-h-[320px]">
        <p className="font-[family-name:var(--font-script)] text-2xl text-green/75 sm:text-3xl">
          Certificate
        </p>
        <div className="gold-line my-4 w-24" aria-hidden />
        <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-fg/50">
          онлайн-курс
        </p>
        <p className="mt-3 font-[family-name:var(--font-serif)] text-xl font-semibold leading-snug text-green sm:text-2xl">
          Смола + дерево 2.0
        </p>
        <p className="mt-4 max-w-[220px] text-xs leading-relaxed text-fg/58">
          Подтверждение прохождения программы по эпоксидной смоле и дереву
        </p>
        <div className="mt-8 flex w-full max-w-xs items-end justify-between gap-4 border-t border-gold/25 pt-6 text-left">
          <div>
            <p className="font-[family-name:var(--font-script)] text-lg text-green/85">
              Salamaha Fine Art
            </p>
            <p className="text-[10px] uppercase tracking-wider text-fg/45">
              Мастерская
            </p>
          </div>
          <div className="text-right">
            <div className="h-px w-16 bg-green/30" aria-hidden />
            <p className="mt-1 text-[10px] text-fg/45">подпись</p>
          </div>
        </div>
      </div>
    </div>
  );
}
