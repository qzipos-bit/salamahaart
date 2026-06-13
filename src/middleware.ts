import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Фильтры магазина — на /catalog/vse-tovary; хаб /catalog без query остаётся статичным. */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (pathname === "/catalog" && search) {
    return NextResponse.redirect(
      new URL(`/catalog/vse-tovary${search}`, request.url),
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/catalog",
};
