"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { useQuiz } from "@/components/quiz/quiz-context";

const steps = [
  {
    title: "Какой формат вам ближе?",
    options: ["Стол / мебель", "Декор и панно", "Сохранение букета", "Пока изучаю"],
  },
  {
    title: "Сроки?",
    options: ["До 3 недель", "1–2 месяца", "Не срочно", "Нужна консультация"],
  },
];

function QuizModalInner({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const pick = (label: string) => {
    const next = [...answers, label];
    setAnswers(next);
    if (step < steps.length - 1) {
      setStep((s) => s + 1);
    } else {
      const text = encodeURIComponent(
        `Здравствуйте! Подбор декора (2 мин.): ${next.join(" → ")}`,
      );
      window.open(`${SITE.whatsapp}?text=${text}`, "_blank", "noopener,noreferrer");
      onClose();
    }
  };

  const current = steps[step];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-green-deep/40 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quiz-title"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Закрыть"
        onClick={onClose}
      />
      <div className="glass-panel relative z-10 w-full max-w-md rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow)]">
        <div className="mb-2 flex items-center justify-between gap-4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-green/55">
            Шаг {step + 1} / {steps.length}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-sm text-green/60 hover:bg-sage-muted/80 hover:text-green"
          >
            Закрыть
          </button>
        </div>
        <h2
          id="quiz-title"
          className="font-serif text-2xl font-semibold text-green"
        >
          {current.title}
        </h2>
        <p className="mt-2 text-sm text-fg/65">
          Ответьте на пару вопросов — откроется чат с готовым текстом заявки.
        </p>
        <div className="mt-6 flex flex-col gap-2">
          {current.options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => pick(opt)}
              className="rounded-[16px] border border-green/12 bg-cream/50 px-4 py-3 text-left text-sm font-medium text-green transition hover:border-green/25 hover:bg-cream"
            >
              {opt}
            </button>
          ))}
        </div>
        <div className="mt-6">
          <Button type="button" variant="ghost" onClick={onClose} className="w-full">
            Пропустить
          </Button>
        </div>
      </div>
    </div>
  );
}

export function QuizModal() {
  const { open, sessionKey, closeQuiz } = useQuiz();
  if (!open) return null;
  return <QuizModalInner key={sessionKey} onClose={closeQuiz} />;
}
