"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { Badge } from "@/components/ui/badge";

type Props = {
  images: string[];
  alt: string;
  badge?: "hit" | "sale" | "new";
};

function imageClass(isPlaceholder: boolean) {
  return isPlaceholder
    ? "object-contain object-center bg-sage-muted/55 p-10 sm:p-12"
    : "object-contain object-center bg-sage-muted/35 p-6 sm:p-10";
}

export function MastersProductGallery({ images, alt, badge }: Props) {
  const slides = images.length > 0 ? images : [];
  const [index, setIndex] = useState(0);
  const current = slides[index] ?? slides[0];
  const isPlaceholder = current?.endsWith(".svg") ?? false;
  const hasMultiple = slides.length > 1;

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + slides.length) % slides.length);
    },
    [slides.length],
  );

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    (e.currentTarget as HTMLElement).dataset.touchX = String(
      e.changedTouches[0].clientX,
    );
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const startX = Number(
        (e.currentTarget as HTMLElement).dataset.touchX ?? 0,
      );
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX;
      if (diff > 48) go(-1);
      if (diff < -48) go(1);
    },
    [go],
  );

  if (!current) return null;

  return (
    <div>
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] border border-green/10 shadow-[var(--shadow-sm)]"
        onTouchStart={hasMultiple ? onTouchStart : undefined}
        onTouchEnd={hasMultiple ? onTouchEnd : undefined}
      >
        <Image
          key={current}
          src={current}
          alt={alt}
          fill
          unoptimized={isPlaceholder}
          className={imageClass(isPlaceholder)}
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
        {badge ? (
          <div className="absolute left-4 top-4 z-10">
            <Badge kind={badge} />
          </div>
        ) : null}
        {hasMultiple ? (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-green/15 bg-cream/90 p-2 text-green shadow-sm transition hover:bg-white"
              aria-label="Предыдущее фото"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
                <path
                  fill="currentColor"
                  d="M12.5 15 7.5 10l5-5 1.1 1.1L9.6 10l4 4z"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-green/15 bg-cream/90 p-2 text-green shadow-sm transition hover:bg-white"
              aria-label="Следующее фото"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
                <path
                  fill="currentColor"
                  d="M7.5 15 5.4 13.9 9.4 10l-4-4L7.5 5l5 5-5 5z"
                />
              </svg>
            </button>
            <p className="absolute bottom-3 right-3 z-10 rounded-full bg-black/45 px-2.5 py-1 text-xs font-medium tabular-nums text-white">
              {index + 1}/{slides.length}
            </p>
          </>
        ) : null}
      </div>
      {hasMultiple ? (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {slides.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              className={`relative aspect-square overflow-hidden rounded-[var(--radius-md)] border bg-sage-muted/35 transition ${
                i === index
                  ? "border-green ring-2 ring-green/25"
                  : "border-green/10 hover:border-green/30"
              }`}
              aria-label={`Фото ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-contain object-center p-1"
                sizes="120px"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
