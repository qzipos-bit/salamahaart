import { Container } from "@/components/layout/container";
import { LeadForm } from "@/components/forms/lead-form";

export function QuickLead() {
  return (
    <section className="border-y border-green/10 bg-sage-muted/40 py-12">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-md">
            <h2 className="font-serif text-2xl font-semibold text-green sm:text-3xl">
              Быстрая заявка
            </h2>
            <p className="mt-2 text-sm text-fg/65">
              Оставьте телефон — пришлю варианты и ориентир по бюджету.
            </p>
          </div>
          <div className="min-w-0 flex-1 lg:max-w-2xl">
            <LeadForm submitLabel="Жду предложение" source="Быстрая заявка" />
          </div>
        </div>
      </Container>
    </section>
  );
}
