"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type QuizContextValue = {
  open: boolean;
  sessionKey: number;
  openQuiz: () => void;
  closeQuiz: () => void;
};

const QuizContext = createContext<QuizContextValue | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);
  const openQuiz = useCallback(() => {
    setSessionKey((k) => k + 1);
    setOpen(true);
  }, []);
  const closeQuiz = useCallback(() => setOpen(false), []);
  const value = useMemo(
    () => ({ open, sessionKey, openQuiz, closeQuiz }),
    [open, sessionKey, openQuiz, closeQuiz],
  );
  return (
    <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
  );
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) {
    throw new Error("useQuiz must be used within QuizProvider");
  }
  return ctx;
}
