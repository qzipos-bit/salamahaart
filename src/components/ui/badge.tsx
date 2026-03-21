type Kind = "hit" | "sale" | "new";

const labels: Record<Kind, string> = {
  hit: "Хит",
  sale: "-30%",
  new: "Новинка",
};

const styles: Record<Kind, string> = {
  hit: "bg-green/90 text-cream",
  sale: "bg-gold/90 text-green-deep",
  new: "bg-sage-muted text-green border border-green/15",
};

export function Badge({ kind }: { kind: Kind }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${styles[kind]}`}
    >
      {labels[kind]}
    </span>
  );
}
