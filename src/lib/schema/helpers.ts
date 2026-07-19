import type { CatalogFaqItem } from "@/lib/catalog-faq-types";
import { absoluteUrl } from "@/lib/schema/site";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export type ItemListEntry = {
  name: string;
  url: string;
};

export function faqAnswerPlainText(answer: string): string {
  return answer
    .replace(/\*\*/g, "")
    .replace(/^#+\s*/gm, "")
    .replace(/\n• /g, ". ")
    .replace(/\n+/g, " ")
    .trim();
}

export function buildBreadcrumbListSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildItemListEntity(
  name: string,
  entries: ItemListEntry[],
  id?: string,
) {
  const schema: Record<string, unknown> = {
    "@type": "ItemList",
    name,
    numberOfItems: entries.length,
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      url: entry.url,
    })),
  };
  if (id) schema["@id"] = id;
  return schema;
}

export function buildItemListSchema(
  name: string,
  entries: ItemListEntry[],
  id?: string,
) {
  return {
    "@context": "https://schema.org",
    ...buildItemListEntity(name, entries, id),
  };
}

export function buildFaqPageSchema(
  items: readonly CatalogFaqItem[] | readonly { q: string; a: string }[],
  id?: string,
) {
  const mainEntity = items.map((item) => {
    const question = "question" in item ? item.question : item.q;
    const answer = "answer" in item ? item.answer : item.a;
    return {
      "@type": "Question",
      name: question.replace(/\*\*/g, "").replace(/^#+\s*/, "").trim(),
      acceptedAnswer: {
        "@type": "Answer",
        text: faqAnswerPlainText(answer),
      },
    };
  });

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
  if (id) schema["@id"] = id;
  return schema;
}
