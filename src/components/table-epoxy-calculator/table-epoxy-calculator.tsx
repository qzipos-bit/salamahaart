"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  TABLE_EPOXY_CALC,
  type TableEpoxyEdge,
  type TableEpoxyLegs,
  type TableEpoxyProductType,
  type TableEpoxyShape,
  type TableEpoxyThicknessCm,
} from "@/lib/table-epoxy-calculator-config";
import {
  buildTableEpoxyInquiryMessage,
  computeTableEpoxyPrice,
  formatAreaM2,
  formatRub,
  type TableEpoxyInputs,
} from "@/lib/table-epoxy-calculator";
import { SITE } from "@/lib/site";

function onlyDigits(s: string): string {
  return s.replace(/\D/g, "");
}

function whatsappInquiryUrl(message: string): string {
  try {
    const base = SITE.whatsapp?.trim() || "https://wa.me/79384440033";
    const u = new URL(base);
    u.searchParams.set("text", message);
    return u.toString();
  } catch {
    const text = encodeURIComponent(message);
    return `https://wa.me/79384440033?text=${text}`;
  }
}

const SHAPE_OPTIONS: { id: TableEpoxyShape; label: string }[] = [
  { id: "circle", label: "Круг" },
  { id: "rectangle", label: "Прямоугольник" },
];

const THICKNESS_OPTIONS: { value: TableEpoxyThicknessCm; label: string }[] =
  TABLE_EPOXY_CALC.thicknessCm.map((cm) => ({
    value: cm,
    label: `${cm} см`,
  }));

const EDGE_OPTIONS: { id: TableEpoxyEdge; label: string }[] = [
  { id: "smooth", label: "Ровный" },
  { id: "live", label: "Живой край" },
];

const LEG_OPTIONS: { id: TableEpoxyLegs; label: string; hint?: string }[] = [
  { id: "none", label: "Без ножек" },
  { id: "standard", label: "Стандартные", hint: "от 2 000 ₽" },
  { id: "premium", label: "Премиум", hint: "от 10 000 ₽" },
];

const OPTION_CHECKS = [
  { key: "optionFlowers" as const, label: "Цветы / декор", hint: "+7 000 ₽" },
  { key: "optionFilm" as const, label: "Защита плёнкой", hint: "от площади" },
  { key: "optionRush" as const, label: "Срочный заказ", hint: "×1,3" },
];

const chipBase =
  "rounded-2xl border px-4 py-3 text-[15px] font-medium transition-all duration-200 md:px-5 md:py-3.5";

function FieldLabel({
  children,
  htmlFor,
}: {
  children: ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-sm font-medium tracking-wide text-[var(--green)]/85"
    >
      {children}
    </label>
  );
}

export function TableEpoxyCalculator() {
  const {
    minDimensionCm,
    copy,
    productCards,
  } = TABLE_EPOXY_CALC;

  const [shape, setShape] = useState<TableEpoxyShape>("circle");
  const [diameterRaw, setDiameterRaw] = useState("");
  const [lengthRaw, setLengthRaw] = useState("");
  const [widthRaw, setWidthRaw] = useState("");
  const [product, setProduct] = useState<TableEpoxyProductType>("woodResin");
  const [thicknessCm, setThicknessCm] = useState<TableEpoxyThicknessCm>(3);
  const [edge, setEdge] = useState<TableEpoxyEdge>("smooth");
  const [legs, setLegs] = useState<TableEpoxyLegs>("none");
  const [optionFlowers, setOptionFlowers] = useState(false);
  const [optionFilm, setOptionFilm] = useState(false);
  const [optionRush, setOptionRush] = useState(false);

  const diameterCm = diameterRaw ? Number(diameterRaw) : NaN;
  const lengthCm = lengthRaw ? Number(lengthRaw) : NaN;
  const widthCm = widthRaw ? Number(widthRaw) : NaN;

  const dimensionsValid = useMemo(() => {
    if (shape === "circle") {
      return (
        Number.isFinite(diameterCm) && diameterCm >= minDimensionCm
      );
    }
    return (
      Number.isFinite(lengthCm) &&
      Number.isFinite(widthCm) &&
      lengthCm >= minDimensionCm &&
      widthCm >= minDimensionCm
    );
  }, [shape, diameterCm, lengthCm, widthCm, minDimensionCm]);

  const inputs: TableEpoxyInputs | null = useMemo(() => {
    if (!dimensionsValid) return null;
    return {
      shape,
      diameterCm: Number.isFinite(diameterCm) ? diameterCm : minDimensionCm,
      lengthCm: Number.isFinite(lengthCm) ? lengthCm : minDimensionCm,
      widthCm: Number.isFinite(widthCm) ? widthCm : minDimensionCm,
      product,
      thicknessCm,
      edge,
      legs,
      optionFlowers,
      optionFilm,
      optionRush,
    };
  }, [
    dimensionsValid,
    shape,
    diameterCm,
    lengthCm,
    widthCm,
    product,
    thicknessCm,
    edge,
    legs,
    optionFlowers,
    optionFilm,
    optionRush,
    minDimensionCm,
  ]);

  const breakdown = useMemo(
    () => (inputs ? computeTableEpoxyPrice(inputs) : null),
    [inputs],
  );

  const inquiryMessage =
    inputs && breakdown
      ? buildTableEpoxyInquiryMessage(inputs, breakdown)
      : "";

  const setOption = (key: (typeof OPTION_CHECKS)[number]["key"], v: boolean) => {
    if (key === "optionFlowers") setOptionFlowers(v);
    if (key === "optionFilm") setOptionFilm(v);
    if (key === "optionRush") setOptionRush(v);
  };

  const optionValue = (key: (typeof OPTION_CHECKS)[number]["key"]) => {
    if (key === "optionFlowers") return optionFlowers;
    if (key === "optionFilm") return optionFilm;
    return optionRush;
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 md:py-14 lg:max-w-4xl">
      <header className="mb-10 text-center md:mb-12">
        <h1
          id="calc-page-heading"
          className="font-[family-name:var(--font-serif)] text-3xl leading-tight tracking-tight text-[var(--green-deep)] sm:text-4xl md:text-[2.75rem]"
        >
          {copy.title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--fg)]/75 md:text-lg">
          {copy.subtitle}
        </p>
        <div className="gold-line mx-auto mt-8 max-w-xs" aria-hidden />
      </header>

      <div className="glass-panel rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-sm)] sm:p-8 md:p-10">
        <div className="space-y-10">
          {/* Форма стола */}
          <div>
            <FieldLabel>Форма стола</FieldLabel>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {SHAPE_OPTIONS.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setShape(o.id)}
                  className={`${chipBase} w-full ${
                    shape === o.id
                      ? "border-[var(--gold)]/55 bg-[var(--sage-muted)]/80 text-[var(--green-deep)] shadow-sm ring-2 ring-[var(--gold)]/35"
                      : "border-[var(--green)]/12 bg-white/60 text-[var(--fg)]/85 hover:border-[var(--gold)]/35 hover:bg-white/90"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          {/* Размеры */}
          <div>
            <FieldLabel>Размеры</FieldLabel>
            <p className="mb-4 text-sm text-[var(--fg)]/60">{copy.dimensionsHint}</p>
            {shape === "circle" ? (
              <div>
                <input
                  id="diameter"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder={copy.placeholderDiameter}
                  value={diameterRaw}
                  onChange={(e) => setDiameterRaw(onlyDigits(e.target.value))}
                  className="w-full rounded-2xl border border-[var(--green)]/14 bg-white/80 px-5 py-4 text-lg text-[var(--fg)] outline-none transition-shadow placeholder:text-[var(--fg)]/35 focus:border-[var(--gold)]/45 focus:ring-2 focus:ring-[var(--gold)]/25"
                />
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <input
                    id="length"
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder={copy.placeholderLength}
                    value={lengthRaw}
                    onChange={(e) => setLengthRaw(onlyDigits(e.target.value))}
                    className="w-full rounded-2xl border border-[var(--green)]/14 bg-white/80 px-5 py-4 text-lg outline-none placeholder:text-[var(--fg)]/35 focus:border-[var(--gold)]/45 focus:ring-2 focus:ring-[var(--gold)]/25"
                  />
                </div>
                <div>
                  <input
                    id="width"
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder={copy.placeholderWidth}
                    value={widthRaw}
                    onChange={(e) => setWidthRaw(onlyDigits(e.target.value))}
                    className="w-full rounded-2xl border border-[var(--green)]/14 bg-white/80 px-5 py-4 text-lg outline-none placeholder:text-[var(--fg)]/35 focus:border-[var(--gold)]/45 focus:ring-2 focus:ring-[var(--gold)]/25"
                  />
                </div>
              </div>
            )}
            {!dimensionsValid &&
              (shape === "circle" ? diameterRaw : lengthRaw || widthRaw) && (
                <p className="mt-2 text-sm text-amber-800/90">
                  Минимальный размер — {minDimensionCm} см.
                </p>
              )}
          </div>

          {/* Тип изделия — карточки */}
          <div>
            <FieldLabel>Тип изделия</FieldLabel>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
              {(Object.keys(productCards) as TableEpoxyProductType[]).map(
                (key) => {
                  const card = productCards[key];
                  const active = product === key;
                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => setProduct(key)}
                      className={`group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border bg-white/70 text-left transition-all duration-300 md:min-h-[280px] ${
                        active
                          ? "border-[var(--gold)]/55 shadow-[var(--shadow-sm)] ring-2 ring-[var(--gold)]/35"
                          : "border-[var(--green)]/10 hover:border-[var(--gold)]/40 hover:shadow-[var(--shadow-sm)]"
                      }`}
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--sage-muted)]">
                        <Image
                          src={card.image}
                          alt={card.imageAlt}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-70 transition-opacity group-hover:opacity-90"
                          aria-hidden
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-4 sm:p-5">
                        <span className="font-[family-name:var(--font-serif)] text-xl text-[var(--green-deep)]">
                          {card.title}
                        </span>
                        <span className="mt-2 text-sm leading-relaxed text-[var(--fg)]/70">
                          {card.description}
                        </span>
                        {active && (
                          <span className="mt-3 text-xs font-medium uppercase tracking-wider text-[var(--gold)]">
                            Выбрано
                          </span>
                        )}
                      </div>
                    </button>
                  );
                },
              )}
            </div>
          </div>

          {/* Толщина */}
          <div>
            <FieldLabel>Толщина</FieldLabel>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {THICKNESS_OPTIONS.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setThicknessCm(t.value)}
                  className={`${chipBase} ${
                    thicknessCm === t.value
                      ? "border-[var(--gold)]/55 bg-[var(--sage-muted)]/90 text-[var(--green-deep)] ring-2 ring-[var(--gold)]/30"
                      : "border-[var(--green)]/12 bg-white/60 hover:border-[var(--gold)]/35"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Край */}
          <div>
            <FieldLabel>Тип края</FieldLabel>
            <div className="grid grid-cols-2 gap-3">
              {EDGE_OPTIONS.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setEdge(o.id)}
                  className={`${chipBase} ${
                    edge === o.id
                      ? "border-[var(--gold)]/50 bg-[var(--sage-muted)]/90 ring-2 ring-[var(--gold)]/28"
                      : "border-[var(--green)]/12 bg-white/60 hover:border-[var(--gold)]/35"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          {/* Ножки */}
          <div>
            <FieldLabel>Ножки</FieldLabel>
            <div className="grid gap-3 sm:grid-cols-3">
              {LEG_OPTIONS.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setLegs(o.id)}
                  className={`${chipBase} flex flex-col items-start text-left ${
                    legs === o.id
                      ? "border-[var(--gold)]/50 bg-[var(--sage-muted)]/90 ring-2 ring-[var(--gold)]/28"
                      : "border-[var(--green)]/12 bg-white/60 hover:border-[var(--gold)]/35"
                  }`}
                >
                  <span>{o.label}</span>
                  {o.hint ? (
                    <span className="mt-1 text-xs font-normal text-[var(--fg)]/50">
                      {o.hint}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          </div>

          {/* Дополнительно */}
          <div>
            <FieldLabel>Дополнительные опции</FieldLabel>
            <div className="space-y-3">
              {OPTION_CHECKS.map((o) => (
                <label
                  key={o.key}
                  className="flex cursor-pointer items-start gap-4 rounded-2xl border border-[var(--green)]/10 bg-white/50 px-4 py-4 transition-colors hover:border-[var(--gold)]/30 hover:bg-white/80 sm:px-5"
                >
                  <input
                    type="checkbox"
                    checked={optionValue(o.key)}
                    onChange={(e) => setOption(o.key, e.target.checked)}
                    className="mt-1 size-5 rounded-md border-[var(--green)]/25 text-[var(--green)] focus:ring-[var(--gold)]/40"
                  />
                  <span className="flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <span className="font-medium text-[var(--fg)]/90">
                      {o.label}
                    </span>
                    <span className="text-sm text-[var(--fg)]/50">{o.hint}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Результат */}
        <div className="mt-12 border-t border-[var(--green)]/10 pt-10">
          {!dimensionsValid ? (
            <p className="text-center text-[var(--fg)]/55">
              Введите корректные размеры (не меньше {minDimensionCm} см), чтобы
              увидеть расчёт.
            </p>
          ) : breakdown ? (
            <>
              <h2 className="text-center font-[family-name:var(--font-serif)] text-2xl text-[var(--green-deep)] md:text-3xl">
                {copy.resultTitle}
              </h2>
              <p className="mt-4 text-center text-3xl font-semibold tracking-tight text-[var(--green-deep)] sm:text-4xl md:text-[2.5rem]">
                от {formatRub(breakdown.rangeLowRub)} до{" "}
                {formatRub(breakdown.rangeHighRub)}
              </p>

              <ul className="mx-auto mt-8 max-w-md space-y-3 rounded-2xl border border-[var(--green)]/8 bg-[var(--cream)]/50 px-5 py-5 text-[15px] sm:px-6">
                <li className="flex justify-between gap-4 border-b border-[var(--green)]/8 pb-3">
                  <span className="text-[var(--fg)]/65">Площадь</span>
                  <span className="font-medium tabular-nums text-[var(--fg)]">
                    {formatAreaM2(breakdown.areaM2)} м²
                  </span>
                </li>
                <li className="flex justify-between gap-4 border-b border-[var(--green)]/8 pb-3">
                  <span className="text-[var(--fg)]/65">Базовый расчёт</span>
                  <span className="font-medium tabular-nums text-[var(--fg)]">
                    {formatRub(Math.round(breakdown.baseBundleRub))}
                  </span>
                </li>
                <li className="flex justify-between gap-4 pt-1">
                  <span className="text-[var(--fg)]/65">Итоговая сумма</span>
                  <span className="font-semibold tabular-nums text-[var(--green-deep)]">
                    {formatRub(breakdown.totalRub)}
                  </span>
                </li>
              </ul>

              <p className="mx-auto mt-6 max-w-lg text-center text-sm leading-relaxed text-[var(--fg)]/60">
                {copy.disclaimer}
              </p>

              <div className="mt-8 flex flex-col items-center gap-4">
                <a
                  href={whatsappInquiryUrl(inquiryMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[var(--green)] px-8 text-[15px] font-semibold tracking-wide text-white shadow-md transition hover:bg-[var(--green-deep)] hover:shadow-lg active:scale-[0.98]"
                >
                  {copy.cta}
                </a>
                <Link
                  href="/#contact"
                  className="text-sm font-medium text-[var(--green)]/80 underline-offset-4 transition hover:text-[var(--green-deep)] hover:underline"
                >
                  Контакты и форма на главной
                </Link>
              </div>
            </>
          ) : null}
        </div>
      </div>

      <p className="mx-auto mt-12 max-w-2xl text-center text-[15px] leading-relaxed text-[var(--fg)]/65 md:text-base">
        {copy.seoParagraph}
      </p>
    </div>
  );
}
