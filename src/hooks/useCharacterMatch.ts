"use client";
import { useState, useCallback } from "react";

interface MatchedCharacter {
  id: string;
  name: string;
  animeSlug: string;
}

interface CharacterMatchResult {
  character: MatchedCharacter;
  similarity: number;
  analysis: string;
}

export function useCharacterMatch() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "matching" | "analyzing" | "done" | "error">("idle");
  const [result, setResult] = useState<CharacterMatchResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const runMatch = useCallback(async (sessionId: string, animeSlug: string) => {
    setIsOpen(true);
    setStatus("matching");
    setErrorMessage(null);

    try {
      const matchRes = await fetch("/api/character-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, animeSlug }),
      });
      if (!matchRes.ok) throw new Error("Match failed");
      const { character, similarity, dimensionsCompared, normalizedTraits } = await matchRes.json();

      setStatus("analyzing");

      const analysisRes = await fetch("/api/character-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, character, similarity, dimensionsCompared, normalizedTraits }),
      });
      if (!analysisRes.ok) throw new Error("Analysis failed");
      const { analysis } = await analysisRes.json();

      setResult({ character, similarity, analysis });
      setStatus("done");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "A apărut o eroare neașteptată.");
      setStatus("error");
    }
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      setStatus("idle");
      setResult(null);
      setErrorMessage(null);
    }, 300);
  }, []);

  return { isOpen, status, result, errorMessage, runMatch, close };
}