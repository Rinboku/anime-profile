// src/utils/normalize.ts
import { TEST_SCALES, TRAIT_TO_TEST } from "@/data/testScale";

/**
 * Normalizează scorurile compozite brute la intervalul 0-1,
 * ca să fie comparabile cu vectorii personajelor din characters.json.
 */
export function normalizeTraitScores(
  rawComposite: Record<string, number>
): Record<string, number> {
  const normalized: Record<string, number> = {};

  for (const [traitKey, rawValue] of Object.entries(rawComposite)) {
    const testId = TRAIT_TO_TEST[traitKey];
    const scale = TEST_SCALES[testId];
    if (!scale) {
      console.warn(`[normalize] No scale config for trait "${traitKey}" (test "${testId}")`);
      continue;
    }

    if (scale.testId === "maladaptive_daydreaming") {
      // Slider 0-100 -> împarte direct la 100
      normalized[traitKey] = Math.min(Math.max(rawValue, 0), 100) / 100;
      continue;
    }

    // Formula standard min-max pentru toate celelalte (inclusiv CRT și BCE,
    // care au deja likertMin: 0, likertMax: 1 în config, deci formula e no-op corect)
    const { likertMin, likertMax } = scale;
    const clamped = Math.min(Math.max(rawValue, likertMin), likertMax);
    normalized[traitKey] = (clamped - likertMin) / (likertMax - likertMin);
  }

  return normalized;
}