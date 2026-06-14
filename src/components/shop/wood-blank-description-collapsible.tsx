type Props = {
  description: string;
};

export function WoodBlankDescriptionCollapsible({ description }: Props) {
  return (
    <details
      className="group rounded-[var(--radius-lg)] border border-green/10 bg-cream/35 px-5 py-1 shadow-[var(--shadow-sm)] open:bg-cream/55 open:shadow-[var(--shadow)]"
    >
      <summary className="cursor-pointer list-none py-3.5 outline-none marker:content-none [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-between gap-3">
          <span className="font-serif text-base font-semibold leading-snug text-green-deep sm:text-lg">
            Описание товара
          </span>
          <span
            className="shrink-0 text-gold transition group-open:rotate-180"
            aria-hidden
          >
            ▼
          </span>
        </span>
      </summary>
      <div className="border-t border-green/10 pb-4 pt-3 text-sm leading-relaxed text-fg/85 whitespace-pre-line sm:text-base">
        {description}
      </div>
    </details>
  );
}
