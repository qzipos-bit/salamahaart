import "server-only";

import nodemailer from "nodemailer";
import type { CartOrderPayload } from "@/lib/cart-types";
import { CART_CATALOG_LABELS } from "@/lib/cart-types";
import {
  cartHasWoodBlankItems,
  cartItemLineTotalRange,
  formatCartOrderTotal,
  formatCartRubRange,
  WOOD_BLANK_CART_PRICE_NOTE,
} from "@/lib/cart-price";
import type { AppliedPromo } from "@/lib/promo-cart";
import {
  calculatePromoForLines,
  PROMO_EXCLUDED_ITEMS_NOTE,
} from "@/lib/promo-cart";
import { SITE } from "@/lib/site";

function getOrderRecipient(): string {
  return process.env.ORDER_NOTIFICATION_EMAIL ?? "salamaha.2012@mail.ru";
}

function getSiteBaseUrl(): string {
  const base = SITE.siteUrl || process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  return base ?? "https://salamaha.ru";
}

function formatOrderText(order: CartOrderPayload, appliedPromo?: AppliedPromo | null): string {
  const lines: string[] = [
    "Новый заказ с сайта Salamaha Fine Art",
    "",
    `Имя: ${order.name}`,
    `Телефон: ${order.phone}`,
  ];
  if (order.email?.trim()) {
    lines.push(`Email: ${order.email.trim()}`);
  }
  if (order.comment?.trim()) {
    lines.push(`Комментарий: ${order.comment.trim()}`);
  }
  lines.push(
    "",
    "Согласия:",
    `— Оферта: да`,
    `— Обработка ПДн: да`,
    `— Рекламная рассылка: ${order.consent.rassylka ? "да" : "нет"}`,
  );
  lines.push("", "Товары:");
  const base = getSiteBaseUrl();
  for (const item of order.items) {
    const catalogLabel = CART_CATALOG_LABELS[item.catalog];
    const lineRange = cartItemLineTotalRange({
      id: `${item.catalog}:${item.slug}`,
      catalog: item.catalog,
      slug: item.slug,
      title: item.title,
      price: item.price,
      productPath: item.productPath,
      quantity: item.quantity,
      priceRub: item.priceRub,
      priceRubMax: item.priceRubMax,
    });
    lines.push(
      `— ${item.title}`,
      `  Каталог: ${catalogLabel}`,
      `  Цена: ${item.price}`,
      `  Количество: ${item.quantity}`,
    );
    if (lineRange) {
      lines.push(`  Сумма: ${formatCartRubRange(lineRange[0], lineRange[1])}`);
    }
    lines.push(`  Ссылка: ${base}${item.productPath}`);
  }
  const orderItemsAsCart = order.items.map((item) => ({
    id: `${item.catalog}:${item.slug}`,
    catalog: item.catalog,
    slug: item.slug,
    title: item.title,
    price: item.price,
    productPath: item.productPath,
    quantity: item.quantity,
    variantId: item.variantId,
    priceRub: item.priceRub,
    priceRubMax: item.priceRubMax,
  }));

  const orderTotalLabel = formatCartOrderTotal(orderItemsAsCart);
  const promoTotals =
    order.promoCode
      ? calculatePromoForLines(
          order.items.map((item) => ({
            catalog: item.catalog,
            slug: item.slug,
            variantId: item.variantId,
            quantity: item.quantity,
            priceRub: item.priceRub,
            priceRubMax: item.priceRubMax,
            price: item.price,
          })),
          order.promoCode,
        ).totalAfterPromoRange
      : null;

  if (order.promoCode?.trim()) {
    lines.push("", `Промокод: ${order.promoCode.trim()}`);
  }
  if (orderTotalLabel) {
    lines.push("", `Сумма: ${orderTotalLabel}`);
  }
  if (appliedPromo) {
    lines.push(
      `Скидка (${appliedPromo.discountPercent}%): −${formatCartRubRange(
        appliedPromo.discountMinRub,
        appliedPromo.discountMaxRub,
      )}`,
    );
    if (promoTotals) {
      lines.push(
        `Итого со скидкой: ${formatCartRubRange(
          promoTotals[0],
          promoTotals[1],
        )}`,
      );
    }
  } else if (order.promoCode?.trim()) {
    lines.push(
      "Скидка по промокоду не применена (нет подходящих позиций в заказе).",
    );
    lines.push(PROMO_EXCLUDED_ITEMS_NOTE);
  } else if (orderTotalLabel) {
    lines.push("", `Итого: ${orderTotalLabel}`);
  }
  if (cartHasWoodBlankItems(orderItemsAsCart)) {
    lines.push("", WOOD_BLANK_CART_PRICE_NOTE);
  }
  lines.push("", `Время: ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}`);
  return lines.join("\n");
}

function formatOrderHtml(
  order: CartOrderPayload,
  appliedPromo?: AppliedPromo | null,
): string {
  const base = getSiteBaseUrl();
  const rows = order.items
    .map((item) => {
      const catalogLabel = CART_CATALOG_LABELS[item.catalog];
      return `<tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e8ebe4;">${escapeHtml(item.title)}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e8ebe4;">${escapeHtml(catalogLabel)}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e8ebe4;">${escapeHtml(item.price)}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e8ebe4;">${item.quantity}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e8ebe4;"><a href="${base}${escapeHtml(item.productPath)}">${escapeHtml(item.productPath)}</a></td>
      </tr>`;
    })
    .join("");

  const promoBlock = order.promoCode?.trim()
    ? `<p><strong>Промокод:</strong> ${escapeHtml(order.promoCode.trim())}</p>`
    : "";
  const discountBlock = appliedPromo
    ? `<p><strong>Скидка (${appliedPromo.discountPercent}%):</strong> −${escapeHtml(
        formatCartRubRange(
          appliedPromo.discountMinRub,
          appliedPromo.discountMaxRub,
        ),
      )}</p>`
    : order.promoCode?.trim()
      ? `<p style="color:#666;">Скидка не применена — ${escapeHtml(
          PROMO_EXCLUDED_ITEMS_NOTE,
        )}</p>`
      : "";

  return `
    <div style="font-family:system-ui,sans-serif;color:#1a1a1a;line-height:1.5;">
      <h2 style="color:#2d4033;">Новый заказ с сайта</h2>
      <p><strong>Имя:</strong> ${escapeHtml(order.name)}</p>
      <p><strong>Телефон:</strong> ${escapeHtml(order.phone)}</p>
      ${order.email?.trim() ? `<p><strong>Email:</strong> ${escapeHtml(order.email.trim())}</p>` : ""}
      ${order.comment?.trim() ? `<p><strong>Комментарий:</strong> ${escapeHtml(order.comment.trim())}</p>` : ""}
      <p><strong>Согласия:</strong> оферта — да; ПДн — да; рассылка — ${order.consent.rassylka ? "да" : "нет"}</p>
      ${promoBlock}
      ${discountBlock}
      <table style="border-collapse:collapse;width:100%;margin-top:16px;font-size:14px;">
        <thead>
          <tr style="background:#e8ebe4;">
            <th style="padding:8px 12px;text-align:left;">Товар</th>
            <th style="padding:8px 12px;text-align:left;">Каталог</th>
            <th style="padding:8px 12px;text-align:left;">Цена</th>
            <th style="padding:8px 12px;text-align:left;">Кол-во</th>
            <th style="padding:8px 12px;text-align:left;">Ссылка</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendOrderEmail(
  order: CartOrderPayload,
  appliedPromo?: AppliedPromo | null,
): Promise<void> {
  const host = process.env.SMTP_HOST ?? "smtp.mail.ru";
  const port = Number(process.env.SMTP_PORT ?? "465");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error(
      "SMTP не настроен: задайте SMTP_USER и SMTP_PASS в .env.local (пароль приложения Mail.ru).",
    );
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const to = getOrderRecipient();
  const from = process.env.SMTP_FROM ?? user;
  const subject = `Заказ с сайта — ${order.name}, ${order.items.length} поз.`;

  await transporter.sendMail({
    from: `Salamaha Fine Art <${from}>`,
    to,
    subject,
    text: formatOrderText(order, appliedPromo),
    html: formatOrderHtml(order, appliedPromo),
  });
}

export type TableCalculatorInquiryPayload = {
  message: string;
  optionFlowersFromBouquet: boolean;
  optionFlowersFromMaster: boolean;
};

function formatTableInquiryText(payload: TableCalculatorInquiryPayload): string {
  const flowers: string[] = [];
  if (payload.optionFlowersFromBouquet) flowers.push("цветы с букета");
  if (payload.optionFlowersFromMaster) flowers.push("цветы мастера");
  const flowersLine =
    flowers.length > 0
      ? flowers.join(", ")
      : "цветы не выбраны";

  return [
    "Запрос точной стоимости стола (калькулятор)",
    "",
    `Опция «цветы»: ${flowersLine}`,
    "",
    payload.message,
  ].join("\n");
}

export async function sendTableCalculatorInquiryEmail(
  payload: TableCalculatorInquiryPayload,
): Promise<void> {
  const host = process.env.SMTP_HOST ?? "smtp.mail.ru";
  const port = Number(process.env.SMTP_PORT ?? "465");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error(
      "SMTP не настроен: задайте SMTP_USER и SMTP_PASS в .env.local (пароль приложения Mail.ru).",
    );
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const to = getOrderRecipient();
  const from = process.env.SMTP_FROM ?? user;
  const flowersSelected =
    payload.optionFlowersFromBouquet || payload.optionFlowersFromMaster;
  const subject = flowersSelected
    ? "Калькулятор стола — запрос стоимости (с цветами)"
    : "Калькулятор стола — запрос стоимости";

  await transporter.sendMail({
    from: `Salamaha Fine Art <${from}>`,
    to,
    subject,
    text: formatTableInquiryText(payload),
    html: `<pre style="font-family:system-ui,sans-serif;white-space:pre-wrap;">${escapeHtml(
      formatTableInquiryText(payload),
    )}</pre>`,
  });
}
