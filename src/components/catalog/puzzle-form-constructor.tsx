"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cartAddItem, cartSetOpen } from "@/lib/cart-store";
import { MASTERS_CATALOG_PATH } from "@/lib/masters-products";
import {
  findPuzzleFormRecommendations,
  formatRub,
  isLockOnlyDimension,
  PUZZLE_CORNER_LABELS,
  PUZZLE_CORNERS,
  PUZZLE_SIDE_LABELS,
  type PuzzleCorner,
  type PuzzleConstructorResult,
  type PuzzleFormPick,
  type PuzzleFormPickKind,
  type PuzzleSideId,
} from "@/lib/puzzle-form-constructor";
import {
  PRICE_DISPLAY_LG_CLASS,
  PRICE_TABLE_CELL_CLASS,
} from "@/lib/product-typography";

const LOCK_FILL = "#4a6741";
const LOCK_STROKE = "#3d5636";
const PLATE_FILL = "#d4e4cf";
const PLATE_STROKE = "#a8c4a0";

function parseCm(value: string): number {
  const n = Number(value.trim().replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

function PuzzleDiagram({ result }: { result: PuzzleConstructorResult }) {
  const L = result.actualLengthCm;
  const W = result.actualWidthCm;
  const pad = 56;
  const maxDraw = 380;
  const scale = Math.min(maxDraw / L, maxDraw / W, 6);
  const drawL = L * scale;
  const drawW = W * scale;
  const svgW = drawL + pad * 2;
  const svgH = drawW + pad * 2;
  const x0 = pad;
  const y0 = pad;
  const wall = 22;

  function sidePlan(id: PuzzleSideId) {
    return result.sides.find((s) => s.id === id)!;
  }

  const hasPlates = result.sides.some((s) => s.plateSegments.length > 0);
  const lockCm = result.corners.tl;

  type BarSegment = { cm: number; kind: "lock" | "plate" };

  type SideBarLayout = {
    segments: BarSegment[];
    /** Длина борта для позиционирования (L или W). */
    spanCm: number;
    /** Плашка у начала и замок у конца (или замок у начала и плашка у конца). */
    mode?: "ends";
    onlyEndLock?: boolean;
    onlyStartLock?: boolean;
    /** Сторона = длина замка — один замок на всю сторону. */
    fullSpanLock?: boolean;
  };

  function isSideLockOnly(sideId: PuzzleSideId): boolean {
    const side = sidePlan(sideId);
    return (
      side.plateSegments.length === 0 &&
      isLockOnlyDimension(side.actualCm, lockCm)
    );
  }

  /** Замок у начала борта (верх-лево, верх-право). */
  function lockCornerForSideStart(sideId: PuzzleSideId): PuzzleCorner | null {
    if (sideId === "top") return "tl";
    if (sideId === "right") return "tr";
    return null;
  }

  /** Замок у конца борта (низ-лево вверх, низ-право влево). */
  function lockCornerForSideEnd(sideId: PuzzleSideId): PuzzleCorner | null {
    if (sideId === "left") return "bl";
    if (sideId === "bottom") return "br";
    return null;
  }

  function firstPlateCm(sideId: PuzzleSideId): number | null {
    const plates = sidePlan(sideId).plateSegments;
    return plates.length > 0 ? plates[0] : null;
  }

  function lastPlateCm(sideId: PuzzleSideId): number | null {
    const plates = sidePlan(sideId).plateSegments;
    return plates.length > 0 ? plates[plates.length - 1] : null;
  }

  /** Угловая плашка, если на борту нет своих плашек, но соседний борт с плашками. */
  function borrowedCornerPlateCm(
    sideId: PuzzleSideId,
    atStart: boolean,
  ): number | null {
    if (!hasPlates) return null;
    if (isSideLockOnly(sideId)) return null;
    const side = sidePlan(sideId);
    if (side.plateSegments.length > 0) return null;

    if (sideId === "left" && atStart) return firstPlateCm("top");
    if (sideId === "top" && !atStart) return firstPlateCm("right");
    if (sideId === "bottom" && atStart) {
      return firstPlateCm("left") ?? firstPlateCm("top");
    }
    if (sideId === "right" && !atStart) return lastPlateCm("bottom");
    return null;
  }

  function sideBarLayout(sideId: PuzzleSideId): SideBarLayout {
    const side = sidePlan(sideId);
    const spanCm = side.actualCm;
    const lockOnly = isSideLockOnly(sideId);
    const startLock = lockCornerForSideStart(sideId);
    const endLock = lockCornerForSideEnd(sideId);

    if (lockOnly) {
      const corner = endLock
        ? result.corners[endLock!]
        : startLock
          ? result.corners[startLock!]
          : lockCm;
      return {
        segments: [{ cm: corner, kind: "lock" }],
        spanCm,
        fullSpanLock: true,
        onlyEndLock: endLock ? true : undefined,
        onlyStartLock: startLock ? true : undefined,
      };
    }

    const segments: BarSegment[] = [];
    const borrowedStart = borrowedCornerPlateCm(sideId, true);
    const borrowedEnd = borrowedCornerPlateCm(sideId, false);

    if (startLock) {
      segments.push({ cm: result.corners[startLock], kind: "lock" });
    } else if (borrowedStart) {
      segments.push({ cm: borrowedStart, kind: "plate" });
    }

    segments.push(
      ...side.plateSegments.map((cm) => ({ cm, kind: "plate" as const })),
    );

    if (endLock) {
      segments.push({ cm: result.corners[endLock], kind: "lock" });
    } else if (borrowedEnd) {
      segments.push({ cm: borrowedEnd, kind: "plate" });
    }

    const filtered = segments.filter((s) => s.cm > 0);

    const endsWithBorrowed =
      hasPlates &&
      side.plateSegments.length === 0 &&
      filtered.length === 2 &&
      ((startLock && borrowedEnd) || (endLock && borrowedStart));

    const onlyEndLock =
      hasPlates &&
      endLock &&
      side.plateSegments.length === 0 &&
      !borrowedStart &&
      filtered.length === 1 &&
      filtered[0].kind === "lock";

    const onlyStartLock =
      hasPlates &&
      startLock &&
      side.plateSegments.length === 0 &&
      !borrowedEnd &&
      filtered.length === 1 &&
      filtered[0].kind === "lock";

    return {
      segments: filtered,
      spanCm,
      mode: endsWithBorrowed ? "ends" : undefined,
      onlyEndLock: onlyEndLock ? true : undefined,
      onlyStartLock: onlyStartLock ? true : undefined,
    };
  }

  type SideBarLayoutResolved = ReturnType<typeof sideBarLayout>;

  function segmentsSumCm(segments: BarSegment[]): number {
    return segments.reduce((s, x) => s + x.cm, 0);
  }

  function segmentSpanPx(
    seg: BarSegment,
    layout: SideBarLayoutResolved,
    barPx: number,
  ): number {
    if (layout.fullSpanLock && layout.segments.length === 1) {
      return barPx;
    }
    if (
      (layout.onlyEndLock || layout.onlyStartLock) &&
      layout.segments.length === 1
    ) {
      return (seg.cm / layout.spanCm) * barPx;
    }
    const sumCm = segmentsSumCm(layout.segments);
    return sumCm > 0 ? (seg.cm / sumCm) * barPx : 0;
  }

  function shouldDashBetween(a: BarSegment, b: BarSegment): boolean {
    if (a.kind === "lock" && b.kind === "lock") return false;
    return true;
  }

  function renderSegmentRect(
    key: string,
    x: number,
    y: number,
    w: number,
    h: number,
    seg: BarSegment,
    labelFlipY = 0,
    rotateLabel = false,
  ) {
    const isLock = seg.kind === "lock";
    const cx = x + w / 2;
    const cy = y + h / 2;
    const minDim = Math.min(w, h);
    return (
      <g key={key}>
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          fill={isLock ? LOCK_FILL : PLATE_FILL}
          stroke={isLock ? LOCK_STROKE : PLATE_STROKE}
          strokeWidth={isLock ? 1.5 : 1}
        />
        {minDim >= 20 ? (
          <text
            x={cx}
            y={cy + labelFlipY}
            textAnchor="middle"
            fill={isLock ? "#f8f8f6" : "#3d5636"}
            fontSize={Math.min(11, minDim / 3)}
            fontWeight={600}
            transform={
              rotateLabel ? `rotate(-90, ${cx}, ${cy})` : undefined
            }
          >
            {seg.cm}
          </text>
        ) : null}
      </g>
    );
  }

  function renderHorizontalBar(
    sideId: PuzzleSideId,
    x: number,
    y: number,
    flipLabels = false,
  ) {
    const layout = sideBarLayout(sideId);
    const { segments, spanCm, mode, onlyEndLock, onlyStartLock } = layout;
    if (segments.length === 0) return null;

    const barW = spanCm * scale;

    if (mode === "ends") {
      const first = segments[0];
      const second = segments[1];
      const firstW = segmentSpanPx(first, layout, barW);
      const secondW = segmentSpanPx(second, layout, barW);
      const firstX = x;
      const secondX = x + barW - secondW;

      return (
        <g key={`${sideId}-h-ends`}>
          {renderSegmentRect(
            `${sideId}-h-a`,
            firstX,
            y,
            firstW,
            wall,
            first,
            flipLabels ? -5 : 4,
          )}
          {renderSegmentRect(
            `${sideId}-h-b`,
            secondX,
            y,
            secondW,
            wall,
            second,
            flipLabels ? -5 : 4,
          )}
        </g>
      );
    }

    let offset = 0;
    if (onlyEndLock) {
      offset = barW - segmentSpanPx(segments[0], layout, barW);
    }

    return segments.map((seg, i) => {
      const segW = segmentSpanPx(seg, layout, barW);
      const segX = x + offset;
      const el = (
        <g key={`${sideId}-h-${i}`}>
          {renderSegmentRect(
            `${sideId}-h-${i}-rect`,
            segX,
            y,
            segW,
            wall,
            seg,
            flipLabels ? -5 : 4,
          )}
          {i < segments.length - 1 &&
          shouldDashBetween(seg, segments[i + 1]) ? (
            <line
              x1={segX + segW}
              y1={y}
              x2={segX + segW}
              y2={y + wall}
              stroke="#8a8a8a"
              strokeWidth={1.5}
              strokeDasharray="3 2"
            />
          ) : null}
        </g>
      );
      if (!onlyEndLock && !onlyStartLock) offset += segW;
      return el;
    });
  }

  function renderVerticalBar(sideId: PuzzleSideId, x: number, y: number) {
    const layout = sideBarLayout(sideId);
    const { segments, spanCm, mode, onlyEndLock } = layout;
    if (segments.length === 0) return null;

    const barH = spanCm * scale;

    if (mode === "ends") {
      const first = segments[0];
      const second = segments[1];
      const firstH = segmentSpanPx(first, layout, barH);
      const secondH = segmentSpanPx(second, layout, barH);
      const firstAtTop = first.kind === "plate";
      const aY = firstAtTop ? y : y + barH - firstH;
      const bY = firstAtTop ? y + barH - secondH : y;

      return (
        <g key={`${sideId}-v-ends`}>
          {renderSegmentRect(
            `${sideId}-v-a`,
            x,
            aY,
            wall,
            firstH,
            first,
            0,
            true,
          )}
          {renderSegmentRect(
            `${sideId}-v-b`,
            x,
            bY,
            wall,
            secondH,
            second,
            0,
            true,
          )}
        </g>
      );
    }

    let offset = 0;
    if (onlyEndLock) {
      offset = barH - segmentSpanPx(segments[0], layout, barH);
    }

    return segments.map((seg, i) => {
      const segH = segmentSpanPx(seg, layout, barH);
      const segY = y + offset;
      const el = (
        <g key={`${sideId}-v-${i}`}>
          {renderSegmentRect(
            `${sideId}-v-${i}-rect`,
            x,
            segY,
            wall,
            segH,
            seg,
            0,
            true,
          )}
          {i < segments.length - 1 &&
          shouldDashBetween(seg, segments[i + 1]) ? (
            <line
              x1={x}
              y1={segY + segH}
              x2={x + wall}
              y2={segY + segH}
              stroke="#8a8a8a"
              strokeWidth={1.5}
              strokeDasharray="3 2"
            />
          ) : null}
        </g>
      );
      if (!onlyEndLock) offset += segH;
      return el;
    });
  }

  const innerX = x0 + wall;
  const innerY = y0 + wall;

  return (
    <div className="rounded-[var(--radius-lg)] border border-green/12 bg-white/80 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green/55">
        Чертёж (вид сверху)
      </p>
      <p className="mt-1 text-sm font-medium text-green">
        {L}×{W} см
      </p>
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        className="mt-3 w-full max-w-full"
        role="img"
        aria-label={`Схема пазловой формы ${L}×${W} см`}
      >
        <rect
          x={innerX}
          y={innerY}
          width={drawL}
          height={drawW}
          className="fill-sage-muted/20 stroke-green/20"
          strokeWidth={1}
          strokeDasharray="6 4"
        />
        <text
          x={innerX + drawL / 2}
          y={innerY + drawW / 2}
          textAnchor="middle"
          className="fill-fg/45 text-[11px]"
        >
          заливка
        </text>

        {renderHorizontalBar("top", innerX, y0)}
        {renderHorizontalBar("bottom", innerX, innerY + drawW, true)}
        {renderVerticalBar("left", x0, innerY)}
        {renderVerticalBar("right", innerX + drawL, innerY)}

        <text
          x={innerX + drawL / 2}
          y={y0 - 14}
          textAnchor="middle"
          className="fill-green text-[11px] font-medium"
        >
          {L} см
        </text>
        <text
          x={x0 - 18}
          y={innerY + drawW / 2}
          textAnchor="middle"
          className="fill-green text-[11px] font-medium"
          transform={`rotate(-90, ${x0 - 18}, ${innerY + drawW / 2})`}
        >
          {W} см
        </text>
      </svg>
      <p className="mt-2 text-xs leading-relaxed text-fg/55">
        <span className="font-medium text-green">Тёмно-зелёный</span> — замок
        в углу (не стыкуется с замком в соседнем углу). При доборных плашках в
        углу замок соединяется с{" "}
        <span className="font-medium text-green/70">светло-зелёной</span>
        плашкой. Пунктир — паз между плашками.
      </p>
    </div>
  );
}

function PickCard({
  pick,
  selected,
  onSelect,
}: {
  pick: PuzzleFormPick;
  selected: boolean;
  onSelect: () => void;
}) {
  const option = pick.option!;
  const { result } = option;
  const excess =
    result.actualLengthCm -
    result.requestedLengthCm +
    (result.actualWidthCm - result.requestedWidthCm);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full flex-col rounded-[var(--radius-md)] border p-4 text-left transition ${
        selected
          ? "border-green bg-green/8 shadow-[var(--shadow-sm)] ring-2 ring-green/25"
          : "border-green/12 bg-white/70 hover:border-green/30 hover:bg-white"
      }`}
    >
      <p className="font-serif text-lg font-semibold text-green">{pick.label}</p>
      <p className="mt-1 text-xs text-fg/55">{pick.description}</p>
      <p className="mt-3 font-sans text-base font-semibold tabular-nums tracking-normal text-green-deep">
        {result.actualLengthCm}×{result.actualWidthCm} см
      </p>
      {excess > 0 ? (
        <p className="mt-1 text-xs tabular-nums text-fg/55">+{excess} см к минимуму</p>
      ) : (
        <p className="mt-1 text-xs text-fg/55">Без добора по размеру</p>
      )}
      <p className="mt-2 text-sm text-fg/70">{option.lockSummary}</p>
      <p className="mt-0.5 text-sm text-fg/60">{option.plateSummary}</p>
      <p
        className={`mt-auto border-t pt-3 ${PRICE_DISPLAY_LG_CLASS} ${
          selected ? "border-green/20" : "border-green/10"
        }`}
      >
        {formatRub(result.totalRub)}
      </p>
      <p className="mt-0.5 text-xs text-fg/50">стоимость</p>
    </button>
  );
}

export function PuzzleFormConstructor() {
  const [lengthInput, setLengthInput] = useState("100");
  const [widthInput, setWidthInput] = useState("100");
  const [selectedKind, setSelectedKind] =
    useState<PuzzleFormPickKind>("economic");

  const lengthCm = parseCm(lengthInput);
  const widthCm = parseCm(widthInput);

  const { picks, errors } = useMemo(
    () => findPuzzleFormRecommendations(lengthCm, widthCm),
    [lengthCm, widthCm],
  );

  const availablePicks = picks.filter((p) => p.option !== null);

  const selectedPick = useMemo(() => {
    const direct = picks.find((p) => p.kind === selectedKind && p.option);
    if (direct?.option) return direct;
    return availablePicks[0] ?? null;
  }, [picks, selectedKind, availablePicks]);

  useEffect(() => {
    if (!picks.find((p) => p.kind === selectedKind)?.option) {
      const first = availablePicks[0];
      if (first) setSelectedKind(first.kind);
    }
  }, [picks, selectedKind, availablePicks]);

  const addAllToCart = () => {
    if (!selectedPick?.option) return;
    for (const item of selectedPick.option.result.bom) {
      for (let i = 0; i < item.quantity; i += 1) {
        cartAddItem({
          catalog: "masters",
          slug: item.slug,
          title: item.label,
          price: formatRub(item.priceRub),
          productPath: `${MASTERS_CATALOG_PATH}/${item.slug}`,
          priceRub: item.priceRub,
        });
      }
    }
    cartSetOpen(true);
  };

  return (
    <section
      className="mb-10 rounded-[var(--radius-lg)] border border-green/12 bg-sage-muted/20 p-6 shadow-[var(--shadow-sm)] lg:p-8"
      aria-labelledby="puzzle-constructor-title"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-green/55">
        Конструктор
      </p>
      <h2
        id="puzzle-constructor-title"
        className="mt-2 font-serif text-2xl font-semibold text-green lg:text-3xl"
      >
        Пазловая форма по вашему размеру
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg/70">
        Укажите минимальный размер. Во всех углах — одинаковые замки: 4×65&nbsp;см
        (без плашек, если сторона равна длине замка) или 4×10&nbsp;см с доборными
        плашками 60&nbsp;см на более длинных сторонах. Конструктор предложит
        варианты подбора.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-green">Длина, см (мин.)</span>
          <input
            type="text"
            inputMode="decimal"
            value={lengthInput}
            onChange={(e) => setLengthInput(e.target.value)}
            className="mt-1.5 w-full rounded-[var(--radius-md)] border border-green/15 bg-white px-3 py-2.5 text-sm text-fg shadow-sm outline-none ring-green/30 transition focus:ring-2"
            placeholder="100"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-green">Ширина, см (мин.)</span>
          <input
            type="text"
            inputMode="decimal"
            value={widthInput}
            onChange={(e) => setWidthInput(e.target.value)}
            className="mt-1.5 w-full rounded-[var(--radius-md)] border border-green/15 bg-white px-3 py-2.5 text-sm text-fg shadow-sm outline-none ring-green/30 transition focus:ring-2"
            placeholder="100"
          />
        </label>
      </div>

      {errors.length > 0 ? (
        <div
          className="mt-6 rounded-[var(--radius-md)] border border-amber-600/25 bg-amber-50 px-4 py-3 text-sm text-amber-900"
          role="alert"
        >
          <p className="font-medium">Не найдено подходящих комбинаций</p>
          <ul className="mt-1 list-inside list-disc space-y-0.5">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {availablePicks.length > 0 ? (
        <>
          <div
            className={`mt-6 grid gap-3 ${
              availablePicks.length >= 4
                ? "lg:grid-cols-4"
                : availablePicks.length >= 3
                  ? "lg:grid-cols-3"
                  : "lg:grid-cols-2"
            }`}
          >
            {availablePicks.map((pick) => (
              <PickCard
                key={pick.kind}
                pick={pick}
                selected={selectedKind === pick.kind}
                onSelect={() => setSelectedKind(pick.kind)}
              />
            ))}
          </div>

          {selectedPick?.option ? (
            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <PuzzleDiagram result={selectedPick.option.result} />

              <div>
                <h3 className="font-serif text-lg font-semibold text-green">
                  Состав заказа
                </h3>
                <p className="mt-1 text-sm text-fg/60">{selectedPick.label}</p>
                <div className="mt-3 overflow-x-auto rounded-[var(--radius-md)] border border-green/10 bg-white/70">
                  <table className="w-full min-w-[280px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-green/10 bg-sage-muted/30 text-xs uppercase tracking-wide text-fg/55">
                        <th className="px-4 py-2.5">Элемент</th>
                        <th className="px-4 py-2.5">Кол-во</th>
                        <th className="px-4 py-2.5">Цена</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPick.option.result.bom.map((item) => (
                        <tr
                          key={item.slug}
                          className="border-b border-green/8 last:border-0"
                        >
                          <td className="px-4 py-2.5">
                            <Link
                              href={`${MASTERS_CATALOG_PATH}/${item.slug}`}
                              className="font-medium text-green hover:underline"
                            >
                              {item.label}
                            </Link>
                          </td>
                          <td className="px-4 py-2.5 tabular-nums">
                            {item.quantity}
                          </td>
                          <td className={`px-4 py-2.5 ${PRICE_TABLE_CELL_CLASS}`}>
                            {formatRub(item.quantity * item.priceRub)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-sage-muted/20 font-semibold text-green">
                        <td className="px-4 py-3" colSpan={2}>Итого</td>
                        <td className={`px-4 py-3 ${PRICE_TABLE_CELL_CLASS}`}>
                          {formatRub(selectedPick.option.result.totalRub)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <details className="mt-4 text-sm text-fg/65">
                  <summary className="cursor-pointer font-medium text-green hover:underline">
                    Разбивка по сторонам
                  </summary>
                  <ul className="mt-2 space-y-1 pl-1">
                    {selectedPick.option.result.sides.map((side) => (
                      <li key={side.id}>
                        <span className="font-medium">
                          {PUZZLE_SIDE_LABELS[side.id]}:
                        </span>{" "}
                        замок {side.lockStartCm} +{" "}
                        {side.plateSegments.length > 0
                          ? side.plateSegments.join(" + ") + " см плашки"
                          : "без плашек"}
                        {" "}= {side.actualCm} см
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-xs text-fg/50">
                    Углы:{" "}
                    {PUZZLE_CORNERS.map(
                      (c) =>
                        `${PUZZLE_CORNER_LABELS[c]} ${selectedPick.option!.corners[c]}`,
                    ).join(" · ")}
                  </p>
                </details>

                <div className="mt-5">
                  <Button type="button" variant="primary" onClick={addAllToCart}>
                    Добавить в корзину
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </section>
  );
}
