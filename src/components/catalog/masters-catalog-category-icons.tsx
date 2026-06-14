import type { ReactNode } from "react";
import type { MasterProductCategory } from "@/lib/masters-products";
import {
  WOOD_BLANK_CUSTOM_SLUG,
  WOOD_BLANK_RECTANGULAR_SLUG,
  WOOD_BLANK_SLAB_CALM_SLUG,
  WOOD_BLANK_SLAB_LIVE_SLUG,
  WOOD_BLANK_SPIL_CALM_SLUG,
  WOOD_BLANK_SPIL_LIVE_SLUG,
} from "@/lib/masters-wood-blank-products";

export type MastersCatalogIconId =
  | "all"
  | "silikagel"
  | "derev-zagotovki"
  | "wood-all"
  | typeof WOOD_BLANK_SLAB_CALM_SLUG
  | typeof WOOD_BLANK_SLAB_LIVE_SLUG
  | typeof WOOD_BLANK_SPIL_CALM_SLUG
  | typeof WOOD_BLANK_SPIL_LIVE_SLUG
  | typeof WOOD_BLANK_RECTANGULAR_SLUG
  | typeof WOOD_BLANK_CUSTOM_SLUG
  | "formy"
  | "formy-all"
  | MasterProductCategory;

type IconProps = { className?: string };

function Svg({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={className}
    >
      {children}
    </svg>
  );
}

function AllCategoriesIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="2.5" y="2.5" width="6" height="6" rx="1.5" fill="currentColor" />
      <rect x="11.5" y="2.5" width="6" height="6" rx="1.5" fill="currentColor" />
      <rect x="2.5" y="11.5" width="6" height="6" rx="1.5" fill="currentColor" />
      <rect x="11.5" y="11.5" width="6" height="6" rx="1.5" fill="currentColor" />
    </Svg>
  );
}

function SilikagelIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path
        d="M6 4.5h8a1.5 1.5 0 0 1 1.5 1.5v1.2a3 3 0 0 1-2.2 2.9L9.5 14h5.5a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2h3.5l2.2-4.8A3 3 0 0 1 6.5 7V6a1.5 1.5 0 0 1 1.5-1.5Z"
        fill="currentColor"
      />
      <circle cx="13.5" cy="6" r="1" fill="currentColor" opacity="0.55" />
      <circle cx="11" cy="8.5" r="0.75" fill="currentColor" opacity="0.55" />
      <circle cx="14.5" cy="9" r="0.75" fill="currentColor" opacity="0.55" />
    </Svg>
  );
}

function WoodIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path
        d="M4 15.5c0-3.5 2.8-6.5 6-6.5s6 3 6 6.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M7 9.2c.8-2.2 2.5-3.7 3-3.7s2.2 1.5 3 3.7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="10" cy="12" r="1.2" fill="currentColor" opacity="0.45" />
    </Svg>
  );
}

function WoodSlabCalmIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle
        cx="10"
        cy="10"
        r="6.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M6.5 10h7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </Svg>
  );
}

function WoodSlabLiveIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path
        d="M4 11.5c1.2-2.8 2.8-4 4-4.5 1.8-.6 3.5.2 5 2.2 1.3 1.7 2.8 2.5 4.5 2.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M5 14.5c2-1.5 3.5-2 5-2s3 .5 5 2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.7"
      />
    </Svg>
  );
}

function WoodSpilIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle
        cx="10"
        cy="10"
        r="5.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle
        cx="10"
        cy="10"
        r="2"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.65"
      />
      <circle cx="10" cy="10" r="0.8" fill="currentColor" />
    </Svg>
  );
}

function WoodSpilLiveIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path
        d="M5.5 12.5c.8-3.5 2.5-5.5 4.5-5.5s3.7 2 4.5 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle
        cx="10"
        cy="10"
        r="2"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.65"
      />
    </Svg>
  );
}

function WoodRectIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect
        x="4.5"
        y="5.5"
        width="11"
        height="9"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </Svg>
  );
}

function WoodCustomIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path
        d="M5 14.5V5.5h8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 5.5v3.5h3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function FormsIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect
        x="3.5"
        y="5"
        width="13"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.4" />
    </Svg>
  );
}

function FormCircleDomIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle
        cx="10"
        cy="9.5"
        r="5.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M4.5 15h11" stroke="currentColor" strokeWidth="1.6" />
    </Svg>
  );
}

function FormCircleRimIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle
        cx="10"
        cy="10"
        r="5.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle
        cx="10"
        cy="10"
        r="3.2"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.35"
      />
    </Svg>
  );
}

function FormSlidingIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect
        x="3"
        y="5.5"
        width="14"
        height="9"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M7 5.5v9M13 5.5v9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeDasharray="1.5 1.5"
      />
    </Svg>
  );
}

function FormSetIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="7" cy="11" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="13" cy="9" r="4" stroke="currentColor" strokeWidth="1.5" />
    </Svg>
  );
}

function FormPuzzleIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path
        d="M4.5 7.5h3.5v2.5a1.5 1.5 0 0 0 1.5 1.5H11v3.5a1.5 1.5 0 0 0 1.5 1.5h2.5V11h2.5a1.5 1.5 0 0 0 1.5-1.5V7.5H14.5A1.5 1.5 0 0 1 13 6H9.5V3.5A1.5 1.5 0 0 1 8 2H5.5v3.5A1.5 1.5 0 0 1 4.5 7.5Z"
        fill="currentColor"
        opacity="0.9"
      />
    </Svg>
  );
}

function ToolsIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path
        d="M6.5 14.5 13.5 7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="13.5" cy="7.5" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5 11.5h3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function MastersCatalogCategoryIcon({
  id,
  className = "h-5 w-5",
}: {
  id: MastersCatalogIconId;
  className?: string;
}) {
  switch (id) {
    case "all":
    case "wood-all":
    case "formy-all":
      return <AllCategoriesIcon className={className} />;
    case "silikagel":
      return <SilikagelIcon className={className} />;
    case "derev-zagotovki":
      return <WoodIcon className={className} />;
    case WOOD_BLANK_SLAB_CALM_SLUG:
      return <WoodSlabCalmIcon className={className} />;
    case WOOD_BLANK_SLAB_LIVE_SLUG:
      return <WoodSlabLiveIcon className={className} />;
    case WOOD_BLANK_SPIL_CALM_SLUG:
      return <WoodSpilIcon className={className} />;
    case WOOD_BLANK_SPIL_LIVE_SLUG:
      return <WoodSpilLiveIcon className={className} />;
    case WOOD_BLANK_RECTANGULAR_SLUG:
      return <WoodRectIcon className={className} />;
    case WOOD_BLANK_CUSTOM_SLUG:
      return <WoodCustomIcon className={className} />;
    case "formy":
      return <FormsIcon className={className} />;
    case "formy-krugi-dom":
      return <FormCircleDomIcon className={className} />;
    case "formy-krugi-bez-dna":
      return <FormCircleRimIcon className={className} />;
    case "formy-razdvizhnaya":
      return <FormSlidingIcon className={className} />;
    case "formy-nabor-krugi-dom":
      return <FormSetIcon className={className} />;
    case "formy-pazl":
      return <FormPuzzleIcon className={className} />;
    case "instrumenty":
      return <ToolsIcon className={className} />;
    default:
      return <AllCategoriesIcon className={className} />;
  }
}
