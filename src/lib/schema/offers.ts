import { ORG_ID } from "@/lib/schema/site";

const IN_STOCK = "https://schema.org/InStock";
const MADE_TO_ORDER = "https://schema.org/MadeToOrder";
const NEW_CONDITION = "https://schema.org/NewCondition";

export function buildProductOffer(input: {
  pageUrl: string;
  priceLabel: string;
  priceFromRub: number;
  priceToRub?: number;
}): Record<string, unknown> {
  const seller = { "@id": ORG_ID };

  if (/по запросу/i.test(input.priceLabel)) {
    return {
      "@type": "Offer",
      url: input.pageUrl,
      priceCurrency: "RUB",
      availability: MADE_TO_ORDER,
      itemCondition: NEW_CONDITION,
      seller,
    };
  }

  if (
    input.priceToRub != null &&
    input.priceToRub > input.priceFromRub
  ) {
    return {
      "@type": "AggregateOffer",
      url: input.pageUrl,
      priceCurrency: "RUB",
      lowPrice: String(input.priceFromRub),
      highPrice: String(input.priceToRub),
      offerCount: 1,
      availability: IN_STOCK,
      seller,
    };
  }

  const offer: Record<string, unknown> = {
    "@type": "Offer",
    url: input.pageUrl,
    priceCurrency: "RUB",
    price: String(input.priceFromRub),
    availability: IN_STOCK,
    itemCondition: NEW_CONDITION,
    seller,
  };

  if (/^от\s/i.test(input.priceLabel.trim())) {
    offer.priceSpecification = {
      "@type": "PriceSpecification",
      price: String(input.priceFromRub),
      priceCurrency: "RUB",
      valueAddedTaxIncluded: true,
    };
  }

  return offer;
}
