"use client";

import { useMemo, useState } from "react";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { WoodBlankDescriptionCollapsible } from "@/components/shop/wood-blank-description-collapsible";
import { CatalogBackButton } from "@/components/shop/catalog-back-button";
import { formatDiameterCm } from "@/lib/masters-format";
import {
  MASTERS_WOOD_BLANK_DIAMETERS_CM,
  type WoodBlankProductKind,
  type WoodBlankThicknessKey,
  buildRectangularVariants,
  formatWoodBlankVariantPrice,
  getRoundSlabComboPrice,
  getSpilDiameterPrice,
  parseRoundWoodVariantId,
  parseSpilWoodVariantId,
  rectangularVariantId,
  roundVariantId,
  spilVariantId,
} from "@/lib/masters-wood-blank-products";
import {
  PRODUCT_PAGE_PRICE_CLASS,
  PRODUCT_VARIANT_PRICE_CLASS,
} from "@/lib/product-typography";

type Props = {
  slug: string;
  title: string;
  kind: WoodBlankProductKind;
  backHref: string;
  productPath: string;
  description: string;
  productSlugs: readonly string[];
};

const THICKNESS_OPTIONS: {
  key: WoodBlankThicknessKey;
  label: string;
}[] = [
  { key: "do-35", label: "до 3,5 см" },
  { key: "4-5", label: "4–5 см" },
];

function edgeKeyForKind(kind: WoodBlankProductKind): "spokojnyj" | "kapovyj" {
  return kind === "slab-calm" || kind === "spil-calm" ? "spokojnyj" : "kapovyj";
}

export function WoodBlankPurchase({
  slug,
  title,
  kind,
  backHref,
  productPath,
  description,
  productSlugs,
}: Props) {
  const edgeKey = edgeKeyForKind(kind);
  const isRectangular = kind === "rectangular";

  const [diameterCm, setDiameterCm] = useState<number>(30);
  const [thicknessKey, setThicknessKey] =
    useState<WoodBlankThicknessKey>("do-35");
  const [rectSizeId, setRectSizeId] = useState(
    rectangularVariantId(30, 40),
  );

  const liveSlabCombos = useMemo(() => {
    if (kind !== "slab-live") return [];
    const combos: {
      id: string;
      label: string;
      priceRub: number;
      priceRubMax?: number;
    }[] = [];
    for (const dia of MASTERS_WOOD_BLANK_DIAMETERS_CM) {
      for (const { key, label: thickLabel } of THICKNESS_OPTIONS) {
        const range = getRoundSlabComboPrice(edgeKey, dia, key);
        if (!range) continue;
        combos.push({
          id: roundVariantId(dia, key),
          label: `${dia} см, ${thickLabel}`,
          priceRub: range[0],
          priceRubMax: range[1] > range[0] ? range[1] : undefined,
        });
      }
    }
    return combos;
  }, [kind, edgeKey]);

  const [liveComboId, setLiveComboId] = useState(
    liveSlabCombos[0]?.id ?? roundVariantId(30, "do-35"),
  );

  const selectedLiveCombo =
    liveSlabCombos.find((c) => c.id === liveComboId) ?? liveSlabCombos[0];

  const calmSlabRange = useMemo(
    () => getRoundSlabComboPrice(edgeKey, diameterCm, thicknessKey),
    [edgeKey, diameterCm, thicknessKey],
  );

  const spilRange = useMemo(
    () => getSpilDiameterPrice(edgeKey, diameterCm),
    [edgeKey, diameterCm],
  );

  const rectangularVariants = useMemo(() => buildRectangularVariants(), []);
  const selectedRect =
    rectangularVariants.find((v) => v.id === rectSizeId) ??
    rectangularVariants[0];

  let priceLabel = "по запросу";
  let cartTitle = title;
  let cartVariantId: string | undefined;
  let priceRub: number | undefined;
  let priceRubMax: number | undefined;

  if (kind === "slab-calm" && calmSlabRange) {
    priceLabel = formatWoodBlankVariantPrice(
      calmSlabRange[0],
      calmSlabRange[1],
    );
    cartVariantId = roundVariantId(diameterCm, thicknessKey);
    cartTitle = `${title}, ${formatDiameterCm(diameterCm)}, ${THICKNESS_OPTIONS.find((t) => t.key === thicknessKey)?.label ?? ""}`;
    priceRub = calmSlabRange[0];
    priceRubMax =
      calmSlabRange[1] > calmSlabRange[0] ? calmSlabRange[1] : undefined;
  } else if (kind === "slab-live" && selectedLiveCombo) {
    priceLabel = formatWoodBlankVariantPrice(
      selectedLiveCombo.priceRub,
      selectedLiveCombo.priceRubMax,
    );
    cartVariantId = selectedLiveCombo.id;
    cartTitle = `${title}, ${selectedLiveCombo.label}`;
    priceRub = selectedLiveCombo.priceRub;
    priceRubMax = selectedLiveCombo.priceRubMax;
  } else if (kind === "spil-calm" || kind === "spil-live") {
    if (spilRange) {
      priceLabel = formatWoodBlankVariantPrice(spilRange[0], spilRange[1]);
      cartVariantId = spilVariantId(diameterCm);
      cartTitle = `${title}, ${formatDiameterCm(diameterCm)}`;
      priceRub = spilRange[0];
      priceRubMax =
        spilRange[1] > spilRange[0] ? spilRange[1] : undefined;
    }
  } else if (isRectangular && selectedRect) {
    cartVariantId = selectedRect.id;
    cartTitle = `${title}, ${selectedRect.label}`;
    priceRub = selectedRect.priceRub;
  }

  const optionButtonClass = (active: boolean) =>
    `rounded-[var(--radius-md)] border px-3 py-2.5 text-left text-sm transition ${
      active
        ? "border-green bg-green/10 font-semibold text-green-deep"
        : "border-green/20 bg-white text-green-deep hover:border-green/40"
    }`;

  return (
    <div className="mt-6">
      <p className={PRODUCT_PAGE_PRICE_CLASS}>{priceLabel}</p>

      <div className="mt-4">
        <WoodBlankDescriptionCollapsible description={description} />
      </div>

      {kind === "slab-calm" ? (
        <>
          <fieldset className="mt-6">
            <legend className="text-sm font-semibold text-green-deep">
              Диаметр
            </legend>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {MASTERS_WOOD_BLANK_DIAMETERS_CM.map((dia) => (
                <button
                  key={dia}
                  type="button"
                  onClick={() => setDiameterCm(dia)}
                  className={optionButtonClass(diameterCm === dia)}
                >
                  {formatDiameterCm(dia)}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="mt-6">
            <legend className="text-sm font-semibold text-green-deep">
              Толщина
            </legend>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {THICKNESS_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setThicknessKey(opt.key)}
                  className={optionButtonClass(thicknessKey === opt.key)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </fieldset>
        </>
      ) : null}

      {kind === "slab-live" ? (
        <fieldset className="mt-6">
          <legend className="text-sm font-semibold text-green-deep">
            Размер и цена
          </legend>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {liveSlabCombos.map((combo) => {
              const active = combo.id === liveComboId;
              return (
                <button
                  key={combo.id}
                  type="button"
                  onClick={() => setLiveComboId(combo.id)}
                  className={optionButtonClass(active)}
                >
                  <span className="block font-semibold">{combo.label}</span>
                  <span className={PRODUCT_VARIANT_PRICE_CLASS}>
                    {formatWoodBlankVariantPrice(
                      combo.priceRub,
                      combo.priceRubMax,
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      {kind === "spil-calm" || kind === "spil-live" ? (
        <fieldset className="mt-6">
          <legend className="text-sm font-semibold text-green-deep">
            Диаметр
          </legend>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {MASTERS_WOOD_BLANK_DIAMETERS_CM.map((dia) => (
              <button
                key={dia}
                type="button"
                onClick={() => setDiameterCm(dia)}
                className={optionButtonClass(diameterCm === dia)}
              >
                {formatDiameterCm(dia)}
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}

      {isRectangular ? (
        <>
          <p className="mt-2 text-sm leading-relaxed text-fg/80">
            Цена зависит от размера и породы — рассчитаем после заявки.
          </p>
          <fieldset className="mt-6">
            <legend className="text-sm font-semibold text-green-deep">
              Размер
            </legend>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {rectangularVariants.map((v) => {
                const active = v.id === rectSizeId;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setRectSizeId(v.id)}
                    className={optionButtonClass(active)}
                  >
                    {v.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </>
      ) : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <AddToCartButton
          catalog="masters"
          slug={slug}
          title={cartTitle}
          price={priceLabel}
          productPath={productPath}
          cartVariantId={cartVariantId}
          priceRub={priceRub}
          priceRubMax={priceRubMax}
          variant="primary"
          fullWidth={false}
          className="sm:min-w-[10rem]"
        />
        <CatalogBackButton
          catalog="masters"
          fallback={backHref}
          productSlugs={productSlugs}
        />
      </div>
    </div>
  );
}

export function woodBlankPurchaseFromVariantId(
  kind: WoodBlankProductKind,
  variantId: string,
  title: string,
): { cartTitle: string; priceRub?: number; priceRubMax?: number } {
  if (kind === "rectangular") {
    const rect = buildRectangularVariants().find((v) => v.id === variantId);
    return {
      cartTitle: rect ? `${title}, ${rect.label}` : title,
      priceRub: rect?.priceRub,
    };
  }

  const round = parseRoundWoodVariantId(variantId);
  if (round) {
    const edgeKey = edgeKeyForKind(kind);
    const range = getRoundSlabComboPrice(
      edgeKey,
      round.diameterCm,
      round.thicknessKey,
    );
    const thickLabel =
      THICKNESS_OPTIONS.find((t) => t.key === round.thicknessKey)?.label ?? "";
    return {
      cartTitle: `${title}, ${formatDiameterCm(round.diameterCm)}, ${thickLabel}`,
      priceRub: range?.[0],
      priceRubMax:
        range && range[1] > range[0] ? range[1] : undefined,
    };
  }

  const spilDia = parseSpilWoodVariantId(variantId);
  if (spilDia != null) {
    const edgeKey = edgeKeyForKind(kind);
    const range = getSpilDiameterPrice(edgeKey, spilDia);
    return {
      cartTitle: `${title}, ${formatDiameterCm(spilDia)}`,
      priceRub: range?.[0],
      priceRubMax:
        range && range[1] > range[0] ? range[1] : undefined,
    };
  }

  return { cartTitle: title };
}
