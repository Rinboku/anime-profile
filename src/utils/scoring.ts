// src/utils/scoring.ts
import { findTraitMapping } from "./traitMapping";
import { TEST_SCALES, TRAIT_TO_TEST } from "@/data/testScale";

export interface RawResponse {
  itemId: string;         // ex: "m3", "ex4", "sc1"
  value: number;          // răspunsul brut (pe scala testului respectiv, sau 0/1 pentru CRT/BCE, sau 0-100 pentru MDS)
  episodeTitle?: string;  // doar pentru itemii cu prefix ambiguu (vezi coliziunile din traitMapping.ts)
}

/**
 * Inversează un răspuns brut pe baza range-ului Likert al testului.
 * Ex: scală 1-5, răspuns 2 -> reversed = 1+5-2 = 4
 */
export function reverseScore(value: number, likertMin: number, likertMax: number): number {
  return likertMin + likertMax - value;
}

/**
 * Agregă toate răspunsurile brute ale unui participant în scoruri compozite,
 * unul per traitKey (subscală). Aplică reverse scoring acolo unde e cazul
 * și tratează separat cazurile speciale (CRT, Maladaptive Daydreaming, BCE).
 *
 * Output: { traitKey: scorMediuBrut } — NEnormalizat încă (vezi normalize.ts pentru pasul următor).
 */
export function computeRawCompositeScores(
  responses: RawResponse[]
): Record<string, number> {
  const buckets: Record<string, number[]> = {};

  for (const response of responses) {
    const mapping = findTraitMapping(response.itemId, response.episodeTitle);
    if (!mapping) {
      console.warn(`[scoring] No trait mapping found for item "${response.itemId}"`);
      continue;
    }

    const testId = TRAIT_TO_TEST[mapping.traitKey];
    const scale = TEST_SCALES[testId];
    if (!scale) {
      console.warn(`[scoring] No scale config for trait "${mapping.traitKey}" (test "${testId}")`);
      continue;
    }

    let scoredValue: number;

    if (scale.testId === "crt") {
      // CRT: value e deja 0 sau 1 (corect/greșit) — nu se face reverse, nu se aplică formula Likert
      scoredValue = response.value;
    } else if (scale.testId === "maladaptive_daydreaming") {
      // Slider 0-100 -> se ține brut aici, normalizarea (/100) se face în normalize.ts
      scoredValue = response.value;
    } else if (scale.testId === "bce") {
      // Binar Da(1)/Nu(0), fără reverse scoring
      scoredValue = response.value;
    } else {
      const isReversed = mapping.reverseIds?.includes(response.itemId) ?? false;
      scoredValue = isReversed
        ? reverseScore(response.value, scale.likertMin, scale.likertMax)
        : response.value;
    }

    if (!buckets[mapping.traitKey]) buckets[mapping.traitKey] = [];
    buckets[mapping.traitKey].push(scoredValue);
  }

  const composite: Record<string, number> = {};
  for (const [traitKey, values] of Object.entries(buckets)) {
    if (traitKey === "cognitive_reflection") {
      // CRT: sumă corecte / total itemi (nu medie de 0/1-uri — e echivalent numeric, dar explicit aici)
      composite[traitKey] = values.reduce((a, b) => a + b, 0) / values.length;
    } else if (traitKey === "benevolent_childhood_experiences") {
      // BCE: sumă Da-uri / total itemi
      composite[traitKey] = values.reduce((a, b) => a + b, 0) / values.length;
    } else {
      // Toate celelalte: medie brută pe subscală
      composite[traitKey] = values.reduce((a, b) => a + b, 0) / values.length;
    }
  }

  return composite;
}