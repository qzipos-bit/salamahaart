import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type Props = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-[18px] px-6 py-3 text-[15px] font-medium tracking-wide transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green";

const variants: Record<Variant, string> = {
  primary:
    "bg-green text-cream shadow-[var(--shadow-sm)] hover:bg-green-deep hover:shadow-[var(--shadow)]",
  secondary:
    "border border-green/25 bg-cream/40 text-green backdrop-blur-sm hover:border-green/40 hover:bg-cream/80",
  ghost: "text-green hover:bg-sage-muted/80",
};

export function Button({
  children,
  href,
  type = "button",
  variant = "primary",
  className = "",
  onClick,
  target,
  rel,
}: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} onClick={onClick}>
      {children}
    </button>
  );
}
