"use client";

import { useMemo, useState, type ComponentType } from "react";
import { RESIN_CALCULATOR_FAQ } from "@/lib/resin-calculator-faq";
import {
  IconIrregular,
  IconPartsMix,
  IconPourVolume,
  IconRectCoat,
  IconRectPour,
  IconRoundCoat,
  IconRoundPour,
  IconSubKnowA,
  IconSubKnowB,
  IconSubTotal,
} from "@/components/resin-calculator/resin-calculator-icons";

/** г/см³ — усреднение; уточняйте по паспорту смолы */
const RESIN_DENSITY_G_PER_CM3 = 1.1;

function parseDecimal(input: string): number | null {
  const t = input.trim().replace(",", ".");
  if (t === "") return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}

function formatGrams(value: number | null): string {
  if (value === null || !Number.isFinite(value) || value < 0) return "0 г";
  const rounded = value >= 100 ? Math.round(value) : Math.round(value * 10) / 10;
  const s = Number.isInteger(rounded) ? String(rounded) : String(rounded);
  return `${s.replace(".", ",")} г`;
}

type CalcMode = "volume" | "components";
type PourType =
  | "rect_pour"
  | "round_pour"
  | "rect_coat"
  | "round_coat"
  | "irregular";
type ComponentSub = "total" | "know_a" | "know_b";

const pourOptions: {
  id: PourType;
  label: string;
  wide?: boolean;
}[] = [
  { id: "rect_pour", label: "Прямоугольная заливка" },
  { id: "round_pour", label: "Круглая заливка" },
  { id: "rect_coat", label: "Прямоугольное покрытие" },
  { id: "round_coat", label: "Круглое покрытие" },
  { id: "irregular", label: "Заливка неправильной формы", wide: true },
];

function splitByRatio(
  totalG: number,
  partA: number,
  partB: number,
): { a: number | null; b: number | null } {
  const sum = partA + partB;
  if (sum <= 0 || partA <= 0 || partB <= 0)
    return { a: null, b: null };
  return {
    a: (totalG * partA) / sum,
    b: (totalG * partB) / sum,
  };
}

const pourIcons: Record<PourType, ComponentType<{ className?: string }>> = {
  rect_pour: IconRectPour,
  round_pour: IconRoundPour,
  rect_coat: IconRectCoat,
  round_coat: IconRoundCoat,
  irregular: IconIrregular,
};

const subModeIcons: Record<ComponentSub, ComponentType<{ className?: string }>> =
  {
    total: IconSubTotal,
    know_a: IconSubKnowA,
    know_b: IconSubKnowB,
  };

function choiceCardClass(active: boolean, extra = "") {
  return [
    "rounded-[var(--radius)] border p-4 text-left transition duration-200",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green",
    active
      ? "border-gold/50 bg-gradient-to-br from-sage-muted/50 to-white shadow-[var(--shadow-sm)] ring-1 ring-gold/20"
      : "border-green/12 bg-white/85 hover:border-gold/30 hover:bg-cream/55",
    extra,
  ].join(" ");
}

function panelClass() {
  return "rounded-[var(--radius-lg)] border border-green/12 bg-gradient-to-b from-white/95 to-cream/40 p-5 shadow-[var(--shadow-sm)] sm:p-6";
}

function FieldRow({
  label,
  suffix,
  value,
  onChange,
  id,
}: {
  label: string;
  suffix: string;
  value: string;
  onChange: (v: string) => void;
  id: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-green/85">
        {label}
      </label>
      <div className="mt-1 flex items-center gap-2">
        <input
          id={id}
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-w-0 flex-1 rounded-xl border border-green/15 bg-cream/30 px-3 py-2.5 text-sm text-fg outline-none transition focus:border-gold/70 focus:bg-white focus:ring-2 focus:ring-gold/15"
        />
        {suffix ? (
          <span className="shrink-0 text-sm font-medium text-gold tabular-nums">
            {suffix}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export function ResinCalculator() {
  const [calcMode, setCalcMode] = useState<CalcMode>("volume");
  const [pourType, setPourType] = useState<PourType>("rect_pour");
  const [componentSub, setComponentSub] = useState<ComponentSub>("total");

  const [lengthCm, setLengthCm] = useState("");
  const [widthCm, setWidthCm] = useState("");
  const [thicknessMm, setThicknessMm] = useState("");
  const [diameterCm, setDiameterCm] = useState("");
  const [waterG, setWaterG] = useState("");

  const [partAStr, setPartAStr] = useState("100");
  const [partBStr, setPartBStr] = useState("60");

  const [weightTotalStr, setWeightTotalStr] = useState("");
  const [weightAStr, setWeightAStr] = useState("");
  const [weightBStr, setWeightBStr] = useState("");

  const partA = parseDecimal(partAStr);
  const partB = parseDecimal(partBStr);
  const ratioInvalid = partA === null || partB === null || partA <= 0 || partB <= 0;

  const volumeCm3 = useMemo(() => {
    if (calcMode !== "volume") return null;
    const th = parseDecimal(thicknessMm);
    if (pourType === "irregular") {
      const w = parseDecimal(waterG);
      if (w === null || w <= 0) return null;
      return w;
    }
    if (th === null || th <= 0) return null;
    const hCm = th / 10;
    if (pourType === "rect_pour" || pourType === "rect_coat") {
      const L = parseDecimal(lengthCm);
      const W = parseDecimal(widthCm);
      if (L === null || W === null || L <= 0 || W <= 0) return null;
      return L * W * hCm;
    }
    const d = parseDecimal(diameterCm);
    if (d === null || d <= 0) return null;
    const r = d / 2;
    return Math.PI * r * r * hCm;
  }, [
    calcMode,
    pourType,
    lengthCm,
    widthCm,
    thicknessMm,
    diameterCm,
    waterG,
  ]);

  const massFromVolume = useMemo(() => {
    if (volumeCm3 === null) return null;
    return volumeCm3 * RESIN_DENSITY_G_PER_CM3;
  }, [volumeCm3]);

  const componentResult = useMemo(() => {
    if (calcMode !== "components" || ratioInvalid) return null;
    if (componentSub === "total") {
      const t = parseDecimal(weightTotalStr);
      if (t === null || t <= 0) return null;
      const { a, b } = splitByRatio(t, partA!, partB!);
      if (a === null || b === null) return null;
      return { total: t, a, b };
    }
    if (componentSub === "know_a") {
      const a = parseDecimal(weightAStr);
      if (a === null || a <= 0) return null;
      const b = (a * partB!) / partA!;
      return { total: a + b, a, b };
    }
    const b = parseDecimal(weightBStr);
    if (b === null || b <= 0) return null;
    const a = (b * partA!) / partB!;
    return { total: a + b, a, b };
  }, [
    calcMode,
    componentSub,
    ratioInvalid,
    partA,
    partB,
    weightTotalStr,
    weightAStr,
    weightBStr,
  ]);

  const displayTotal =
    calcMode === "volume" ? massFromVolume : componentResult?.total ?? null;
  const displayA =
    calcMode === "volume"
      ? massFromVolume !== null && !ratioInvalid
        ? splitByRatio(massFromVolume, partA!, partB!).a
        : null
      : componentResult?.a ?? null;
  const displayB =
    calcMode === "volume"
      ? massFromVolume !== null && !ratioInvalid
        ? splitByRatio(massFromVolume, partA!, partB!).b
        : null
      : componentResult?.b ?? null;

  const isCoat =
    pourType === "rect_coat" || pourType === "round_coat";

  return (
    <div className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        {/* Left column */}
        <div className="space-y-6">
          <section className={panelClass()}>
            <h2 className="font-serif text-lg font-semibold text-green">
              1. Выберите тип калькулятора
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setCalcMode("volume")}
                className={choiceCardClass(
                  calcMode === "volume",
                  "flex flex-col items-center gap-1",
                )}
              >
                <IconPourVolume className="mx-auto" />
                <p className="mt-1 text-center text-sm font-medium leading-snug text-fg">
                  Сколько смолы нужно для заливки?
                </p>
              </button>
              <button
                type="button"
                onClick={() => setCalcMode("components")}
                className={choiceCardClass(
                  calcMode === "components",
                  "flex flex-col items-center gap-1",
                )}
              >
                <IconPartsMix className="mx-auto" />
                <p className="mt-1 text-center text-sm font-medium leading-snug text-fg">
                  Сколько компонента A и/или B нужно?
                </p>
              </button>
            </div>
          </section>

          {calcMode === "volume" ? (
            <section className={panelClass()}>
              <h2 className="font-serif text-lg font-semibold text-green">
                2. Выберите тип заливки
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {pourOptions.map((opt) => {
                  const Icon = pourIcons[opt.id];
                  const wide = opt.wide;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPourType(opt.id)}
                      className={[
                        choiceCardClass(
                          pourType === opt.id,
                          "flex flex-col items-center gap-2 py-5",
                        ),
                        wide ? "col-span-2" : "",
                      ].join(" ")}
                    >
                      <Icon />
                      <span className="text-center text-xs font-medium leading-snug text-fg sm:text-sm">
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          ) : (
            <section className={panelClass()}>
              <h2 className="font-serif text-lg font-semibold text-green">
                2. Выберите тип расчёта
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-fg/70">
                Расчёт количества каждого компонента, если известен вес готовой
                смеси или одного из компонентов.
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {(
                  [
                    ["total", "Я знаю только общее количество (A+B), которое мне нужно"] as const,
                    ["know_a", "Я знаю только вес компонента A, сколько нужно компонента B?"] as const,
                    ["know_b", "Я знаю только вес компонента B, сколько нужно компонента A?"] as const,
                  ] as const
                ).map(([id, label]) => {
                  const SubIcon = subModeIcons[id];
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setComponentSub(id)}
                      className={choiceCardClass(
                        componentSub === id,
                        "flex items-center gap-4 text-left",
                      )}
                    >
                      <SubIcon className="shrink-0 scale-90 sm:scale-100" />
                      <span className="text-sm font-medium leading-snug text-fg">
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {calcMode === "volume" ? (
            <section className={panelClass()}>
              <h2 className="font-serif text-lg font-semibold text-green">
                Введите размеры
              </h2>
              <p className="mt-2 text-sm text-fg/70">
                Примечание: длина и ширина в{" "}
                <strong className="font-semibold text-green-deep">см</strong>,
                толщина в{" "}
                <strong className="font-semibold text-gold">мм</strong>.
              </p>

              {pourType === "irregular" ? (
                <>
                  <div className="mt-4">
                    <FieldRow
                      id="water-g"
                      label="Вес воды"
                      suffix="г"
                      value={waterG}
                      onChange={setWaterG}
                    />
                  </div>
                  <div className="mt-4 rounded-xl border border-green/15 bg-sage-muted/40 px-4 py-3 text-sm leading-relaxed text-fg/80">
                    Поставьте форму на весы, обнулите показания, залейте воду до
                    нужного уровня заливки и введите получившийся вес — он в граммах
                    близок к объёму в мл и см³.
                  </div>
                </>
              ) : (
                <div className="mt-4 space-y-4">
                  {pourType === "rect_pour" || pourType === "rect_coat" ? (
                    <>
                      <FieldRow
                        id="len"
                        label="Длина"
                        suffix="см"
                        value={lengthCm}
                        onChange={setLengthCm}
                      />
                      <FieldRow
                        id="wid"
                        label="Ширина"
                        suffix="см"
                        value={widthCm}
                        onChange={setWidthCm}
                      />
                    </>
                  ) : (
                    <FieldRow
                      id="dia"
                      label="Диаметр"
                      suffix="см"
                      value={diameterCm}
                      onChange={setDiameterCm}
                    />
                  )}
                  <FieldRow
                    id="thick"
                    label="Толщина"
                    suffix="мм"
                    value={thicknessMm}
                    onChange={setThicknessMm}
                  />
                  {isCoat ? (
                    <div className="rounded-xl border border-gold/35 bg-gradient-to-r from-gold/10 to-sage-muted/35 px-4 py-3 text-sm leading-relaxed text-green-deep/95">
                      Минимальная рекомендуемая толщина покрытия смолой: 1,5–2
                      мм.
                    </div>
                  ) : null}
                </div>
              )}
            </section>
          ) : null}

          <section className={panelClass()}>
            <h2 className="font-serif text-lg font-semibold text-green">
              Введите пропорции смолы
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-fg/70">
              Обычно указаны на этикетке смолы или на сайте продавца. Например
              A:B = 100:60.{" "}
              <a
                href="#faq-proportsii-smoly"
                className="font-medium text-green underline-offset-2 hover:underline"
              >
                Подробнее…
              </a>
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <FieldRow
                id="part-a"
                label="Компонент A"
                suffix=""
                value={partAStr}
                onChange={setPartAStr}
              />
              <FieldRow
                id="part-b"
                label="Компонент B"
                suffix=""
                value={partBStr}
                onChange={setPartBStr}
              />
            </div>
            {ratioInvalid ? (
              <p className="mt-3 text-sm text-red-700/90">
                Укажите положительные числа для обеих частей пропорции.
              </p>
            ) : null}
          </section>

          {calcMode === "components" ? (
            <section className={panelClass()}>
              <h2 className="font-serif text-lg font-semibold text-green">
                Введите вес ниже
              </h2>
              <div className="mt-4 space-y-4">
                {componentSub === "total" ? (
                  <FieldRow
                    id="mix-total"
                    label="Общий вес смолы (A+B) в граммах"
                    suffix="г"
                    value={weightTotalStr}
                    onChange={setWeightTotalStr}
                  />
                ) : null}
                {componentSub === "know_a" ? (
                  <FieldRow
                    id="mix-a"
                    label="Вес компонента A"
                    suffix="г"
                    value={weightAStr}
                    onChange={setWeightAStr}
                  />
                ) : null}
                {componentSub === "know_b" ? (
                  <FieldRow
                    id="mix-b"
                    label="Вес компонента B"
                    suffix="г"
                    value={weightBStr}
                    onChange={setWeightBStr}
                  />
                ) : null}
              </div>
            </section>
          ) : null}

          <section className={panelClass()}>
            <h2 className="font-serif text-lg font-semibold text-green">
              Результат
            </h2>
            <p className="mt-1 text-xs text-fg/55">
              Ориентировочно, плотность смеси в расчётах:{" "}
              {RESIN_DENSITY_G_PER_CM3} г/см³.
            </p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-gold/25 bg-gradient-to-r from-gold/12 via-sage-muted/45 to-cream/60 px-4 py-3.5">
                <span className="font-serif text-sm font-semibold text-green">
                  Всего:
                </span>
                <span className="font-serif text-lg font-semibold text-green-deep tabular-nums">
                  {formatGrams(displayTotal)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-green/12 bg-sage-muted/35 px-4 py-3.5">
                <span className="text-sm font-medium text-green/90">
                  Компонент A:
                </span>
                <span className="text-lg font-semibold text-green-deep tabular-nums">
                  {ratioInvalid ? "—" : formatGrams(displayA)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-green/10 bg-cream/70 px-4 py-3.5">
                <span className="text-sm font-medium text-green/80">
                  Компонент B:
                </span>
                <span className="text-lg font-semibold text-green tabular-nums">
                  {ratioInvalid ? "—" : formatGrams(displayB)}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>

      <section
        className="rounded-[var(--radius-lg)] border border-green/12 bg-gradient-to-b from-white/95 to-cream/40 p-5 shadow-[var(--shadow-sm)] sm:p-8"
        aria-labelledby="resin-faq-heading"
      >
        <h2
          id="resin-faq-heading"
          className="font-serif text-2xl font-semibold text-green sm:text-3xl"
        >
          Часто задаваемые вопросы
        </h2>
        <div className="mt-8 flex flex-col gap-3">
          {RESIN_CALCULATOR_FAQ.map((item) => (
            <details
              key={item.question}
              id={item.anchorId}
              className="group rounded-[var(--radius-lg)] border border-green/10 bg-cream/35 px-5 py-1 shadow-[var(--shadow-sm)] open:bg-cream/50 open:shadow-[var(--shadow)] scroll-mt-28"
            >
              <summary className="cursor-pointer list-none py-4 font-serif text-base font-semibold leading-snug text-green outline-none marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-3">
                  <span>{item.question}</span>
                  <span
                    className="mt-0.5 shrink-0 text-gold transition group-open:rotate-180"
                    aria-hidden
                  >
                    ▼
                  </span>
                </span>
              </summary>
              <div className="border-t border-green/10 pb-4 pt-3 text-sm leading-relaxed text-fg/75">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
