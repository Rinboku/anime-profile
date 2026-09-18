import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface DemographicPayload {
  age?: number;
  gender?: string;
  country?: string;
  citizenship?: string;
  ethnicity?: string;
  education?: string;
  occupation?: string;
  incomeSource?: string;
  financeFeel?: string;
  relationshipStatus?: string;
  living?: string;
  dailyIndoorHours?: string;
  religion?: string;
  hasCondition?: boolean;
  conditionType?: string;
  dailyAnimeEpisodes?: number;
  watchesInNativeLanguage?: boolean;
  watchLanguage?: string;
  languageLevel?: string;
  firstAnimeAgeRange?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { animeSlug, consentGiven, locale, respondentId, demographics } = body as {
      animeSlug: string;
      consentGiven: boolean;
      locale?: string;
      respondentId?: string;
      demographics?: DemographicPayload;
    };

    if (!animeSlug) {
      return NextResponse.json({ error: "animeSlug este obligatoriu" }, { status: 400 });
    }

    if (!consentGiven) {
      return NextResponse.json(
        { error: "Consimțământul este obligatoriu pentru a începe chestionarul" },
        { status: 400 }
      );
    }

    let respondent;

    if (respondentId) {
      respondent = await prisma.respondent.findUnique({ where: { id: respondentId } });

      if (respondent && demographics) {
        respondent = await prisma.respondent.update({
          where: { id: respondentId },
          data: { ...demographics },
        });
      }
    }

    if (!respondent) {
      respondent = await prisma.respondent.create({
        data: {
          consentGiven,
          locale: locale ?? null,
          ...demographics,
        },
      });
    }

    const session = await prisma.quizSession.create({
      data: {
        respondentId: respondent.id,
        animeSlug,
      },
    });

    return NextResponse.json({
      respondentId: respondent.id,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Eroare la crearea sesiunii:", error);
    return NextResponse.json({ error: "Eroare internă la crearea sesiunii" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json({ error: "sessionId este obligatoriu" }, { status: 400 });
    }

    const session = await prisma.quizSession.update({
      where: { id: sessionId },
      data: { completedAt: new Date() },
    });

    return NextResponse.json({ session });
  } catch (error) {
    console.error("Eroare la finalizarea sesiunii:", error);
    return NextResponse.json({ error: "Eroare internă la finalizarea sesiunii" }, { status: 500 });
  }
}