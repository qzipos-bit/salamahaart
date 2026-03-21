"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SITE } from "@/lib/site";

type Props = {
  submitLabel?: string;
  source?: string;
};

export function LeadForm({
  submitLabel = "Оставить заявку",
  source = "Сайт",
}: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Укажите имя";
    if (!phone.trim()) next.phone = "Укажите телефон";
    setErrors(next);
    if (Object.keys(next).length) return;

    const text = encodeURIComponent(
      `Заявка (${source}). Имя: ${name.trim()}. Телефон: ${phone.trim()}.`,
    );
    window.open(`${SITE.whatsapp}?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-4 md:flex-row md:items-end md:gap-4"
    >
      <div className="min-w-0 flex-1 space-y-4 md:flex md:gap-4 md:space-y-0">
        <Input
          label="Имя"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Как к вам обращаться"
          autoComplete="name"
          error={errors.name}
          className="flex-1"
        />
        <Input
          label="Телефон"
          name="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+7 ..."
          autoComplete="tel"
          error={errors.phone}
          className="flex-1"
        />
      </div>
      <Button
        type="submit"
        className="w-full max-w-full shrink-0 whitespace-normal md:w-auto"
      >
        {submitLabel}
      </Button>
    </form>
  );
}
