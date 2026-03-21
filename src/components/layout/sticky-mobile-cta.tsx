import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export function StickyMobileCta() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 p-4 md:hidden">
      <div className="pointer-events-auto mx-auto max-w-[1320px]">
        <Button
          href={SITE.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full shadow-[var(--shadow)]"
        >
          Написать в WhatsApp
        </Button>
      </div>
    </div>
  );
}
