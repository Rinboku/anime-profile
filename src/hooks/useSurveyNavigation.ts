// src/hooks/useSurveyNavigation.ts
import { useState } from 'react';
import { CatalogItem } from '../data/quizData';

interface RawResponsePayload {
  itemId: string;
  episodeTitle?: string;
  value: number;
}

export const useSurveyNavigation = (
  catalog: CatalogItem[],
  sessionId: string | null,
  onFinish: () => void
) => {
  const [arcIdx, setArcIdx] = useState(0);
  const [epIdx, setEpIdx] = useState(0);
  const [subIdx, setSubIdx] = useState(0);
  const [itemIdx, setItemIdx] = useState(0);

  const [isBreak, setIsBreak] = useState(false);
  const [pendingResponses, setPendingResponses] = useState<RawResponsePayload[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const currentArc = catalog[arcIdx];
  const currentEp = currentArc.episodes[epIdx];
  const currentSub = currentEp.subscales[subIdx];
  const currentItem = currentSub.items[itemIdx];

  const isLastItemInSubscale = itemIdx === currentSub.items.length - 1;
  const isLastSubInEp = subIdx === currentEp.subscales.length - 1;
  const isLastEpInArc = epIdx === currentArc.episodes.length - 1;
  const isLastArc = arcIdx === catalog.length - 1;
  const isVeryLastItem = isLastItemInSubscale && isLastSubInEp && isLastEpInArc && isLastArc;

  const handleAnswer = (value: number) => {
    const newResponse: RawResponsePayload = {
      itemId: currentItem.id,
      episodeTitle: currentEp.title,
      value,
    };
    const updatedPending = [...pendingResponses, newResponse];

    if (!isLastItemInSubscale) {
      setPendingResponses(updatedPending);
      setItemIdx((prev) => prev + 1);
      return;
    }

    // Ultimul item din subscala curentă -> trimitem batch-ul acumulat către backend
    flushResponses(updatedPending, isVeryLastItem);
  };

  async function flushResponses(responses: RawResponsePayload[], isFinalFlush: boolean) {
    if (!sessionId || responses.length === 0) {
      setPendingResponses([]);
      if (isFinalFlush) {
        onFinish();
      } else {
        setIsBreak(true);
      }
      return;
    }

    setIsSaving(true);
    try {
      await fetch('/api/responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, responses }),
      });
    } catch (err) {
      console.error('[useSurveyNavigation] Eroare la salvarea răspunsurilor:', err);
      // TODO: eventual UI de eroare/retry, dacă vrei robustețe suplimentară
    } finally {
      setIsSaving(false);
      setPendingResponses([]);
      if (isFinalFlush) {
        onFinish();
      } else {
        setIsBreak(true);
      }
    }
  }

  const nextSubscale = () => {
    setIsBreak(false);
    if (subIdx < currentEp.subscales.length - 1) {
      setSubIdx((prev) => prev + 1);
      setItemIdx(0);
    } else if (epIdx < currentArc.episodes.length - 1) {
      setEpIdx((prev) => prev + 1);
      setSubIdx(0);
      setItemIdx(0);
    } else if (arcIdx < catalog.length - 1) {
      setArcIdx((prev) => prev + 1);
      setEpIdx(0);
      setSubIdx(0);
      setItemIdx(0);
    }
  };

  return {
    currentItem,
    currentSub,
    currentEp,
    currentArc,
    handleAnswer,
    isBreak,
    nextSubscale,
    isSaving,
  };
};