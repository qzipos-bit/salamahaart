import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export type CategoryMetadataInput = {
  /** Канонический путь, например `/catalog/stoly` */
  path: string;
  title: string;
  description: string;
};

/** Общий хелпер meta для категорий и фасетов (Этап 1–2). */
export function buildCategoryMetadata(input: CategoryMetadataInput): Metadata {
  const path = input.path.startsWith("/") ? input.path : `/${input.path}`;
  const canonical = SITE.siteUrl ? `${SITE.siteUrl}${path}` : undefined;
  return {
    title: input.title,
    description: input.description,
    ...(canonical ? { alternates: { canonical } } : {}),
  };
}
