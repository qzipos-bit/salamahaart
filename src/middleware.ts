import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { BUKET_LANDING_PATH } from "@/lib/buket-landing";
import { resolveCatalogCategoryRedirect } from "@/lib/catalog-category-pages";

/** Фильтры магазина — на /catalog/vse-tovary; категории — на канонические ЧПУ. */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === "/catalog" || pathname === "/catalog/vse-tovary") {
    const cat = new URLSearchParams(search).get("cat");
    if (cat === "bukety") {
      return NextResponse.redirect(
        new URL(BUKET_LANDING_PATH, request.url),
        301,
      );
    }
  }

  const categoryTarget = resolveCatalogCategoryRedirect(pathname, search);
  if (categoryTarget) {
    return NextResponse.redirect(new URL(categoryTarget, request.url), 301);
  }

  if (pathname === "/catalog" && search) {
    return NextResponse.redirect(
      new URL(`/catalog/vse-tovary${search}`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/catalog", "/catalog/vse-tovary"],
};
