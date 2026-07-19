"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  backHref: string;
  backLabel?: string;
};

export function LegalPrintActions({
  backHref,
  backLabel = "← Вернуться к документу",
}: Props) {
  return (
    <div className="no-print mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <Link
        href={backHref}
        className="text-sm font-medium text-green/75 hover:text-green hover:underline"
      >
        {backLabel}
      </Link>
      <Button
        type="button"
        variant="secondary"
        className="!py-2.5 !text-sm"
        onClick={() => window.print()}
      >
        Сохранить как PDF
      </Button>
    </div>
  );
}
