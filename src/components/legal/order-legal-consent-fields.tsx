"use client";

import Link from "next/link";

type Props = {
  acceptOferta: boolean;
  onAcceptOfertaChange: (value: boolean) => void;
  acceptPdn: boolean;
  onAcceptPdnChange: (value: boolean) => void;
  acceptRassylka: boolean;
  onAcceptRassylkaChange: (value: boolean) => void;
};

const checkboxClass =
  "mt-0.5 size-4 shrink-0 rounded border-green/30 text-green focus:ring-green/30";

const labelClass =
  "flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-fg/80";

export function OrderLegalConsentFields({
  acceptOferta,
  onAcceptOfertaChange,
  acceptPdn,
  onAcceptPdnChange,
  acceptRassylka,
  onAcceptRassylkaChange,
}: Props) {
  return (
    <fieldset className="space-y-3 border-t border-green/10 pt-4">
      <legend className="sr-only">Согласия при оформлении заказа</legend>

      <label className={labelClass}>
        <input
          type="checkbox"
          className={checkboxClass}
          checked={acceptOferta}
          onChange={(e) => onAcceptOfertaChange(e.target.checked)}
          required
        />
        <span>
          Я принимаю условия{" "}
          <Link
            href="/oferta"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-green underline-offset-4 hover:underline"
          >
            публичной оферты
          </Link>
        </span>
      </label>

      <label className={labelClass}>
        <input
          type="checkbox"
          className={checkboxClass}
          checked={acceptPdn}
          onChange={(e) => onAcceptPdnChange(e.target.checked)}
          required
        />
        <span>
          Даю{" "}
          <Link
            href="/soglasie-na-obrabotku-pdn"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-green underline-offset-4 hover:underline"
          >
            согласие на обработку персональных данных
          </Link>{" "}
          для оформления и исполнения заказа
        </span>
      </label>

      <label className={labelClass}>
        <input
          type="checkbox"
          className={checkboxClass}
          checked={acceptRassylka}
          onChange={(e) => onAcceptRassylkaChange(e.target.checked)}
        />
        <span>
          Хочу получать{" "}
          <Link
            href="/soglasie-na-rassylku"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-green underline-offset-4 hover:underline"
          >
            рекламную рассылку
          </Link>{" "}
          (акции, новинки, курс)
        </span>
      </label>
    </fieldset>
  );
}
