"use client";

import { useQuiz } from "@/components/quiz/quiz-context";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function QuizLaunchButton({ children, className = "" }: Props) {
  const { openQuiz } = useQuiz();
  return (
    <button
      type="button"
      onClick={openQuiz}
      className={className}
    >
      {children}
    </button>
  );
}
