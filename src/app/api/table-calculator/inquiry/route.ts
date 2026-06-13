import { NextResponse } from "next/server";
import {
  sendTableCalculatorInquiryEmail,
  type TableCalculatorInquiryPayload,
} from "@/lib/send-order-email";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<TableCalculatorInquiryPayload>;
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json({ error: "Пустое сообщение" }, { status: 400 });
    }

    const payload: TableCalculatorInquiryPayload = {
      message,
      optionFlowersFromBouquet: Boolean(body.optionFlowersFromBouquet),
      optionFlowersFromMaster: Boolean(body.optionFlowersFromMaster),
    };

    await sendTableCalculatorInquiryEmail(payload);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[table-calculator/inquiry]", err);
    return NextResponse.json(
      { error: "Не удалось отправить уведомление" },
      { status: 500 },
    );
  }
}
