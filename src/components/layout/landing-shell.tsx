"use client";

import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { StickyMobileCta } from "@/components/layout/sticky-mobile-cta";
import { QuizModal } from "@/components/quiz/quiz-modal";
import { QuizProvider, useQuiz } from "@/components/quiz/quiz-context";

function Inner({ children }: { children: ReactNode }) {
  const { openQuiz } = useQuiz();
  return (
    <div className="flex min-h-screen flex-col">
      <Header onOpenQuiz={openQuiz} />
      <main className="flex-1 pb-24 md:pb-0">{children}</main>
      <Footer />
      <StickyMobileCta />
      <QuizModal />
    </div>
  );
}

export function LandingShell({ children }: { children: ReactNode }) {
  return (
    <QuizProvider>
      <Inner>{children}</Inner>
    </QuizProvider>
  );
}
