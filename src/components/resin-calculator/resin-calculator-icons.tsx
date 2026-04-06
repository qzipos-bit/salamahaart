"use client";

import { useId, type ReactNode } from "react";

const stroke = "var(--green)";
const strokeSoft = "color-mix(in srgb, var(--green) 55%, white)";
const gold = "var(--gold)";

type IconProps = { className?: string };

/** Подложка: лёгкий «матовый стекло», в духе glassmorphism бренда */
function IconFrame({ children, className = "" }: IconProps & { children: ReactNode }) {
  return (
    <span
      className={[
        "relative flex h-[4.5rem] w-full max-w-[7.75rem] items-center justify-center",
        "rounded-2xl border border-white/50 bg-gradient-to-br from-white/75 via-sage-muted/40 to-cream/80",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_10px_28px_rgba(30,48,36,0.07)]",
        "ring-1 ring-green/10 backdrop-blur-[6px]",
        className,
      ].join(" ")}
      aria-hidden
    >
      {children}
    </span>
  );
}

function liquidGradientDefs(id: string) {
  return (
    <defs>
      <linearGradient id={`${id}-liquid`} x1="18%" y1="12%" x2="82%" y2="92%">
        <stop offset="0%" stopColor="var(--sage-muted)" stopOpacity="0.92" />
        <stop offset="45%" stopColor="var(--sage)" stopOpacity="0.72" />
        <stop offset="100%" stopColor="var(--green-deep)" stopOpacity="0.38" />
      </linearGradient>
      <linearGradient id={`${id}-shine`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="white" stopOpacity="0.55" />
        <stop offset="40%" stopColor="white" stopOpacity="0" />
        <stop offset="100%" stopColor="transparent" />
      </linearGradient>
    </defs>
  );
}

/** Режим заливки: параллелепипед со смолой + капля (как референс, в тонах бренда) */
export function IconPourVolume({ className = "" }: IconProps) {
  const id = useId().replace(/:/g, "");
  return (
    <IconFrame className={className}>
      <svg viewBox="0 0 72 64" className="h-[3.35rem] w-[4rem]" fill="none">
        {liquidGradientDefs(id)}
        {/* Задняя грань — намёк */}
        <path
          d="M40 24l12 7v18l-12-7V24Z"
          fill="var(--cream)"
          fillOpacity="0.35"
          stroke={strokeSoft}
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Лицевая грань со смолой */}
        <path
          d="M22 43V25l18-9 18 9v18l-18 9-18-9Z"
          fill={`url(#${id}-liquid)`}
          stroke={stroke}
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Уровень смолы — чуть светлее верх */}
        <path
          d="M25 36.5l15-7.5 15 7.5L40 44l-15-7.5Z"
          fill="white"
          fillOpacity="0.18"
          stroke="none"
        />
        {/* Верхняя кромка формы */}
        <path
          d="M22 25l18-9 18 9"
          stroke={gold}
          strokeWidth="1.15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Блик на «стекле» */}
        <path
          d="M26 38V28l6-3v10l-6 3Z"
          fill={`url(#${id}-shine)`}
          opacity="0.9"
        />
        {/* Капля над формой */}
        <path
          d="M36 7c-1.8 3.8-4.2 8.2-2.8 12.4 1.2 3.6 5.4 3.2 6-.4 1-4.2-.2-9.2-1.6-12.4-.9-2-1-1.6-1.6-1.6 0 0-.8 1-.8 2Z"
          fill={`url(#${id}-liquid)`}
          stroke={gold}
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <ellipse cx="34" cy="12" rx="2.2" ry="1.2" fill="white" fillOpacity="0.45" />
        <path
          d="M36 20v5"
          stroke={strokeSoft}
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>
    </IconFrame>
  );
}

/** A + B → смесь: стрелки к ромбу A+B как на референсе */
export function IconPartsMix({ className = "" }: IconProps) {
  const id = useId().replace(/:/g, "");
  return (
    <IconFrame className={className}>
      <svg viewBox="0 0 72 64" className="h-[3.35rem] w-[4rem]" fill="none">
        <defs>
          <linearGradient id={`${id}-drop`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--sage-muted)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--sage)" stopOpacity="0.65" />
          </linearGradient>
          <linearGradient id={`${id}-mix`} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--green-deep)" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        {/* Стрелки к ромбу */}
        <path
          d="M23 40 Q30 28 32 22 M49 40 Q42 28 40 22"
          stroke={gold}
          strokeWidth="1.05"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />
        {/* Ромб A+B */}
        <path
          d="M36 10l8 12-8 12-8-12 8-12Z"
          fill={`url(#${id}-mix)`}
          stroke={gold}
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <text
          x="29.5"
          y="24"
          fontSize="6.5"
          fill="var(--green-deep)"
          fontFamily="var(--font-sans), system-ui, sans-serif"
          fontWeight="700"
        >
          A+B
        </text>
        <path
          d="M36 8v4"
          stroke={strokeSoft}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.6"
        />
        {/* Капля A */}
        <path
          d="M18 46c0-4 3.5-10 5-10s5 6 5 10-2.2 4-5 4-5-2-5-4Z"
          fill={`url(#${id}-drop)`}
          stroke={stroke}
          strokeWidth="1"
        />
        <text
          x="21"
          y="43"
          fontSize="8.5"
          fill="var(--green-deep)"
          fontFamily="var(--font-sans), system-ui, sans-serif"
          fontWeight="700"
        >
          A
        </text>
        {/* Капля B */}
        <path
          d="M44 46c0-4 3.5-10 5-10s5 6 5 10-2.2 4-5 4-5-2-5-4Z"
          fill={`url(#${id}-drop)`}
          stroke={stroke}
          strokeWidth="1"
          opacity="0.92"
        />
        <text
          x="47"
          y="43"
          fontSize="8.5"
          fill="var(--green-deep)"
          fontFamily="var(--font-sans), system-ui, sans-serif"
          fontWeight="700"
        >
          B
        </text>
      </svg>
    </IconFrame>
  );
}

/** Прямоугольная заливка — глубокая ёмкость со смолой */
export function IconRectPour({ className = "" }: IconProps) {
  const id = useId().replace(/:/g, "");
  return (
    <IconFrame className={className}>
      <svg viewBox="0 0 72 58" className="h-[3.15rem] w-[4.1rem]" fill="none">
        {liquidGradientDefs(id)}
        <path
          d="M44 22l10 6v20l-10 6V22Z"
          fill="var(--cream)"
          fillOpacity="0.4"
          stroke={strokeSoft}
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <path
          d="M18 44V24l18-10 18 10v20l-18 10-18-10Z"
          fill={`url(#${id}-liquid)`}
          stroke={stroke}
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <path
          d="M20 36l16-9 16 9-16 9-16-9Z"
          fill="white"
          fillOpacity="0.15"
        />
        <path
          d="M18 24l18-10 18 10"
          stroke={gold}
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <path
          d="M22 40V30l5-2.8v10L22 40Z"
          fill={`url(#${id}-shine)`}
          opacity="0.75"
        />
      </svg>
    </IconFrame>
  );
}

/** Круглая заливка — цилиндр со смолой */
export function IconRoundPour({ className = "" }: IconProps) {
  const id = useId().replace(/:/g, "");
  return (
    <IconFrame className={className}>
      <svg viewBox="0 0 72 58" className="h-[3.15rem] w-[4.1rem]" fill="none">
        {liquidGradientDefs(id)}
        <ellipse cx="36" cy="17" rx="15" ry="5.8" fill="var(--sage-muted)" fillOpacity="0.45" stroke={strokeSoft} strokeWidth="0.9" />
        <path
          d="M21 17v18c0 3.8 6.7 7 15 7s15-3.2 15-7V17"
          fill={`url(#${id}-liquid)`}
          stroke={stroke}
          strokeWidth="1.05"
        />
        <ellipse cx="36" cy="35" rx="15" ry="5.8" fill="var(--sage)" fillOpacity="0.5" stroke={gold} strokeWidth="0.95" />
        <ellipse cx="32" cy="24" rx="5" ry="8" fill="white" fillOpacity="0.12" transform="rotate(-12 32 24)" />
      </svg>
    </IconFrame>
  );
}

/** Прямоугольное покрытие — тонкая «плёнка» смолы */
export function IconRectCoat({ className = "" }: IconProps) {
  const id = useId().replace(/:/g, "");
  return (
    <IconFrame className={className}>
      <svg viewBox="0 0 72 58" className="h-[3.15rem] w-[4.1rem]" fill="none">
        <defs>
          <linearGradient id={`${id}-film`} x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="var(--sage-muted)" stopOpacity="0.55" />
            <stop offset="50%" stopColor="var(--sage)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="var(--cream)" stopOpacity="0.65" />
          </linearGradient>
        </defs>
        <path
          d="M42 30l12 3.5v3l-24 8-12-4v-3l12-3.5 12 3.5Z"
          fill="var(--cream)"
          fillOpacity="0.5"
          stroke={strokeSoft}
          strokeWidth="0.75"
        />
        <path
          d="M14 36V33l22-8 22 8v3L36 47 14 36Z"
          fill={`url(#${id}-film)`}
          stroke={stroke}
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path
          d="M14 33l22-8 22 8"
          stroke={gold}
          strokeWidth="1.05"
        />
        <path
          d="M20 34.5h32"
          stroke="white"
          strokeWidth="0.85"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>
    </IconFrame>
  );
}

/** Круглое покрытие — тонкий диск */
export function IconRoundCoat({ className = "" }: IconProps) {
  const id = useId().replace(/:/g, "");
  return (
    <IconFrame className={className}>
      <svg viewBox="0 0 72 58" className="h-[3.15rem] w-[4.1rem]" fill="none">
        <defs>
          <linearGradient id={`${id}-disk`} x1="35%" y1="25%" x2="65%" y2="75%">
            <stop offset="0%" stopColor="var(--sage-muted)" stopOpacity="0.65" />
            <stop offset="100%" stopColor="var(--green-deep)" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <ellipse cx="36" cy="34" rx="21" ry="7.5" fill="var(--cream)" fillOpacity="0.4" stroke={strokeSoft} strokeWidth="0.8" />
        <ellipse cx="36" cy="31" rx="21" ry="7.5" fill={`url(#${id}-disk)`} stroke={stroke} strokeWidth="1" />
        <ellipse cx="36" cy="29.5" rx="21" ry="7.5" fill="none" stroke={gold} strokeWidth="0.85" opacity="0.9" />
        <ellipse cx="30" cy="28" rx="7" ry="3.5" fill="white" fillOpacity="0.35" />
      </svg>
    </IconFrame>
  );
}

/** Неправильная форма — «лужа» смолы */
export function IconIrregular({ className = "" }: IconProps) {
  const id = useId().replace(/:/g, "");
  return (
    <IconFrame className={className}>
      <svg viewBox="0 0 72 58" className="h-[3.15rem] w-[4.4rem]" fill="none">
        {liquidGradientDefs(id)}
        <path
          d="M19 38c-7-7-4.5-17 5-21.5 6-3 14-3.5 21-1.5 9 2.5 14.5 11 11.5 18.5-2 6-10 9.5-18 9.5-5.5 0-11-2-13.5-4.5l-6-1Z"
          fill={`url(#${id}-liquid)`}
          stroke={stroke}
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <path
          d="M28 24c5-3.5 14-2 19 3"
          stroke="white"
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.4"
        />
        <path
          d="M34 17c2 1.5 3.5 4 2.5 6.5"
          stroke={gold}
          strokeWidth="0.95"
          strokeLinecap="round"
          opacity="0.85"
        />
        <ellipse cx="38" cy="28" rx="8" ry="5" fill="white" fillOpacity="0.12" />
      </svg>
    </IconFrame>
  );
}

/** Подрежимы: сумма / только A / только B */
export function IconSubTotal({ className = "" }: IconProps) {
  const id = useId().replace(/:/g, "");
  return (
    <IconFrame className={`max-w-[3.25rem] ${className}`}>
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
        <defs>
          <linearGradient id={`${id}-s`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--sage-muted)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--cream)" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="15" stroke={strokeSoft} strokeWidth="1" fill={`url(#${id}-s)`} />
        <path
          d="M17 24h14M24 17v14"
          stroke={gold}
          strokeWidth="1.35"
          strokeLinecap="round"
        />
      </svg>
    </IconFrame>
  );
}

export function IconSubKnowA({ className = "" }: IconProps) {
  const id = useId().replace(/:/g, "");
  return (
    <IconFrame className={`max-w-[3.25rem] ${className}`}>
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
        <defs>
          <linearGradient id={`${id}-a`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--sage-muted)" stopOpacity="0.75" />
            <stop offset="100%" stopColor="white" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <rect
          x="13"
          y="13"
          width="22"
          height="24"
          rx="4"
          fill={`url(#${id}-a)`}
          stroke={stroke}
          strokeWidth="1.05"
        />
        <text
          x="18"
          y="29"
          fontSize="11"
          fill="var(--green-deep)"
          fontFamily="var(--font-sans), sans-serif"
          fontWeight="700"
        >
          A
        </text>
        <path
          d="M33 31l7 5"
          stroke={gold}
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>
    </IconFrame>
  );
}

export function IconSubKnowB({ className = "" }: IconProps) {
  const id = useId().replace(/:/g, "");
  return (
    <IconFrame className={`max-w-[3.25rem] ${className}`}>
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
        <defs>
          <linearGradient id={`${id}-b`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--sage)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--sage-muted)" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <rect
          x="13"
          y="13"
          width="22"
          height="24"
          rx="4"
          fill={`url(#${id}-b)`}
          stroke={stroke}
          strokeWidth="1.05"
        />
        <text
          x="17.5"
          y="29"
          fontSize="11"
          fill="var(--green-deep)"
          fontFamily="var(--font-sans), sans-serif"
          fontWeight="700"
        >
          B
        </text>
        <path
          d="M15 31l-7 5"
          stroke={gold}
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>
    </IconFrame>
  );
}
