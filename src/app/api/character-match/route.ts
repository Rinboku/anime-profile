// src/app/api/character-match/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { computeRawCompositeScores } from "@/utils/scoring";
import { normalizeTraitScores } from "@/utils/normalize";
import { findBestMatchingCharacter } from "@/utils/similarity";

export async function POST(req: Request) {
  const { sessionId } = await req.json();

  if (!sessionId) {
    return NextResponse.json({ error: "missing session." }, { status: 400 });
  }

  try {
    const session = await prisma.quizSession.findUnique({ where: { id: sessionId } });
    if (!session) {
      return NextResponse.json({ error: "Session not found." }, { status: 404 });
    }
    const animeSlug = session.animeSlug;

    const itemResponses = await prisma.itemResponse.findMany({ where: { sessionId } });

    if (itemResponses.length === 0) {
      return NextResponse.json({ error: "No response session found." }, { status: 404 });
    }

    const numericResponses = itemResponses.filter((r) => r.value !== null);

    const rawComposite = computeRawCompositeScores(
      numericResponses.map((r) => ({
        itemId: r.itemId,
        value: r.value as number,
        episodeTitle: r.episodeTitle || undefined,
      }))
    );
    const normalized = normalizeTraitScores(rawComposite);

    await prisma.factorScore.createMany({
      data: Object.keys(rawComposite).map((scaleName) => ({
        sessionId,
        scaleName,
        rawScore: rawComposite[scaleName],
        normalizedScore: normalized[scaleName] ?? null,
      })),
      skipDuplicates: true,
    });

    const { character, similarity, dimensionsCompared } = await findBestMatchingCharacter(normalized, animeSlug);

    return NextResponse.json({
      sessionId,
      character: { id: character.id, name: character.name, animeSlug: character.animeSlug },
      similarity,
      dimensionsCompared,
      normalizedTraits: normalized,
    });
  } catch (err) {
    console.error("[character-match]", err);
    return NextResponse.json({ error: "Error of matching score." }, { status: 500 });
  }
}