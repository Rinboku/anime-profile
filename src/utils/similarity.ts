// src/utils/similarity.ts
import { prisma } from "@/lib/prisma";
import { VECTOR_KEY_ORDER } from "@/data/vectorKeyOrder";

function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  if (magA === 0 || magB === 0) return 0;
  return dot / (magA * magB);
}

export async function findBestMatchingCharacter(
  participantTraits: Record<string, number>,
  animeSlug?: string
) {
  const characters = await prisma.character.findMany({
    where: animeSlug ? { animeSlug } : undefined,
  });

  if (characters.length === 0) {
    throw new Error("No characters found in database.");
  }

  const participantVector = VECTOR_KEY_ORDER.map((key) => participantTraits[key] ?? 0.5);

  const scored = characters.map((character) => ({
    character,
    similarity: cosineSimilarity(participantVector, character.vector),
    dimensionsCompared: VECTOR_KEY_ORDER.length,
  }));

  scored.sort((a, b) => b.similarity - a.similarity);
  return scored[0];
}