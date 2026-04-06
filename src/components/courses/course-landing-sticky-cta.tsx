"use client";

import {
  COURSE_SMOLA_DEREVO,
  formatCoursePrice,
  smolaDerevoWhatsAppHref,
} from "@/lib/course-smola-derevo";

export function CourseLandingStickyCta() {
  const href = smolaDerevoWhatsAppHref();
  const price = formatCoursePrice(COURSE_SMOLA_DEREVO.priceRub);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-green/12 bg-cream/92 px-4 py-3 shadow-[0_-8px_32px_rgba(30,48,36,0.08)] backdrop-blur-md md:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-[48px] w-full items-center justify-center rounded-full bg-green px-6 text-[15px] font-semibold tracking-wide text-cream shadow-[var(--shadow-sm)] transition hover:bg-green-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green active:scale-[0.99]"
      >
        Записаться — {price}
      </a>
    </div>
  );
}
