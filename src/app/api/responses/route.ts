import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, responses } = body as {
      sessionId: string;
      responses: { itemId: string; episodeTitle?: string; value?: number; textValue?: string }[];
    };

    if (!sessionId) {
      return NextResponse.json({ error: "sessionId este obligatoriu" }, { status: 400 });
    }
    if (!responses || responses.length === 0) {
      return NextResponse.json({ error: "responses este obligatoriu și nu poate fi gol" }, { status: 400 });
    }

    await Promise.all(
      responses.map((r) =>
        prisma.itemResponse.upsert({
          where: {
            sessionId_itemId_episodeTitle: {
              sessionId,
              itemId: r.itemId,
              episodeTitle: r.episodeTitle ?? "",
            },
          },
          update: { value: r.value ?? null, textValue: r.textValue ?? null },
          create: {
            sessionId,
            itemId: r.itemId,
            episodeTitle: r.episodeTitle ?? "",
            value: r.value ?? null,
            textValue: r.textValue ?? null,
          },
        })
      )
    );

    return NextResponse.json({ success: true, count: responses.length });
  } catch (error) {
    console.error("Eroare la salvarea răspunsurilor:", error);
    return NextResponse.json({ error: "Eroare internă la salvarea răspunsurilor" }, { status: 500 });
  }
}