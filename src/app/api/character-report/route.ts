import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";
import { prisma } from "@/lib/prisma";
import { VECTOR_KEY_ORDER } from "@/data/vectorKeyOrder";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  const { sessionId, character, similarity, dimensionsCompared, normalizedTraits } = await req.json();

  if (!sessionId || !character || !normalizedTraits) {
    return NextResponse.json({ error: "Missing Data." }, { status: 400 });
  }

  try {
    const fullCharacter = await prisma.character.findUnique({
      where: { id: character.id },
    });

    if (!fullCharacter) {
      return NextResponse.json({ error: "Character not found." }, { status: 404 });
    }

    const characterTraits: Record<string, number> = {};
    VECTOR_KEY_ORDER.forEach((key, i) => {
      characterTraits[key] = fullCharacter.vector[i];
    });

       const TRAIT_LABELS: Record<string, string> = {
      machiavellianism: "Machiavellianism",
      narcissism: "Narcissism",
      psychopathy: "Psychopathy",
      sadism: "Sadism",
      extraversion: "Extraversion",
      agreeableness: "Agreeableness",
      conscientiousness: "Conscientiousness",
      neuroticism: "Neuroticism",
      openness: "Openness",
      premeditation: "Premeditation",
      urgency_negative: "Negative Urgency",
      sensation_seeking: "Sensation Seeking",
      urgency_positive: "Positive Urgency",
      need_for_cognition: "Need for Cognition",
      cognitive_reflection: "Cognitive Reflection",
      maladaptive_daydreaming: "Maladaptive Daydreaming",
      self_blame_cerq: "Self-Blame",
      acceptance_cerq: "Acceptance",
      rumination: "Rumination",
      positive_refocusing: "Positive Refocusing",
      refocus_planning: "Refocusing on Planning",
      positive_reappraisal: "Positive Reappraisal",
      putting_into_perspective: "Putting into Perspective",
      catastrophizing: "Catastrophizing",
      other_blame: "Blaming Others",
      cognitive_reappraisal: "Cognitive Reappraisal",
      expressive_suppression: "Expressive Suppression",
      self_distraction: "Self-Distraction",
      active_coping: "Active Coping",
      denial: "Denial",
      substance_use_coping: "Substance-Based Coping",
      humor_coping: "Humor as Coping",
      emotional_support_seeking: "Seeking Emotional Support",
      instrumental_support_seeking: "Seeking Practical Support",
      behavioral_disengagement: "Behavioral Disengagement",
      venting: "Venting",
      positive_reframing: "Positive Reframing",
      planning_coping: "Planning",
      acceptance_coping: "Acceptance",
      religion_coping: "Religious Coping",
      self_blame_coping: "Self-Blame",
      psychological_pain: "Psychological Pain",
      depression: "Depression",
      stress: "Stress",
      anxiety: "Anxiety",
      anhedonia: "Anhedonia",
      self_esteem: "Self-Esteem",
      life_satisfaction: "Life Satisfaction",
      boredom_global: "Boredom Proneness",
      autonomy: "Autonomy",
      competence: "Competence",
      relatedness: "Relatedness",
      forgiveness_self: "Self-Forgiveness",
      forgiveness_others: "Forgiveness of Others",
      forgiveness_situations: "Forgiveness of Situations",
      self_kindness: "Self-Kindness",
      self_judgment: "Self-Judgment",
      common_humanity_self: "Common Humanity",
      isolation: "Isolation",
      mindfulness: "Mindfulness",
      over_identification: "Over-Identification",
      compassion_coldness: "Emotional Coldness",
      common_humanity_others: "Compassion for Others",
      compassion_in_action: "Compassion in Action",
      self_expansion: "Self-Expansion through Escapism",
      self_suppression: "Self-Suppression through Escapism",
      benevolent_childhood_experiences: "Positive Childhood Experiences",
      social_withdrawal: "Social Withdrawal",
      social_anxiety: "Social Anxiety",
      social_avoidance: "Social Avoidance",
      need_to_belong: "Need to Belong",
    };

    const topShared = VECTOR_KEY_ORDER
      .filter((key) => normalizedTraits[key] !== undefined)
      .map((key) => ({
        trait: TRAIT_LABELS[key] ?? key.replace(/_/g, " "),
        participant: normalizedTraits[key] as number,
        character: characterTraits[key],
        diff: Math.abs(normalizedTraits[key] - characterTraits[key]),
      }))
      .sort((a, b) => a.diff - b.diff)
      .slice(0, 10);

        const traitList = topShared.map(t => t.trait).join(", ");
 const characterContext = fullCharacter.description
      ? `/nHere is verified background information about ${fullCharacter.name} — use ONLY this as your factual source for the character's story, traits, and moments. Do not invent plot details beyond what is stated or reasonably inferred here:\n"${fullCharacter.description}"\n`
      : `/nNote: no verified background is available for this character. Keep story references general and avoid inventing specific plot events or moments.\n`;

    const prompt = `You are a thoughtful writer producing a personalized narrative report for a participant in a doctoral research study on personality and anime culture.

The character the participant matched with is ${fullCharacter.name} from ${fullCharacter.animeSlug.replace(/_/g, " ")}.
Overall similarity: ${(similarity * 100).toFixed(1)}%.
${characterContext}

The psychological dimensions where the participant's profile aligns most closely with ${fullCharacter.name} are: ${traitList}.

Write a 1000-1300 word analysis in English that:
1. Focuses primarily on STORYTELLING, not statistics. Do not mention percentages, scores, numbers, or technical psychological terminology (e.g. do not say "cosine similarity", "scored 0.50", or list raw trait names mechanically).
2. Draws on specific, memorable moments, arcs, or turning points from ${fullCharacter.name}'s journey in the anime that illustrate the shared traits listed above, and uses those story moments as the main vehicle for explaining the resemblance to the participant.
3. Weaves the psychological dimensions into the narrative naturally and conversationally (e.g. "like [Character], you seem to process setbacks by..." rather than listing trait names directly).
4. Includes a few genuine, nuanced points of difference between the participant and the character, grounded in the character's story, not just similarities.
5. Maintains a warm, reflective, accessible tone — like a thoughtful essay about a character's psychology, not a clinical report.
6. Does NOT invent facts about the participant beyond what is implied by the listed dimensions, and does NOT invent anime plot events that did not happen.

Do not add a title or disclaimer, just the analysis text.`;

const modelsToTry = ["gemini-3.6-flash", "gemini-3.0-flash"]; // update to verified-current model names
let analysis: string | undefined;

async function tryGeminiModel(modelName: string, prompt: string, retries = 2): Promise<string | undefined> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      console.log(`Se încearcă modelul: ${modelName} (attempt ${attempt + 1})...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      if (result?.response) {
        console.log(`Succes cu modelul: ${modelName}`);
        return result.response.text();
      }
    } catch (err: any) {
      const isOverloaded = err?.message?.includes("503") || err?.message?.includes("overloaded") || err?.message?.includes("high demand");
      console.error(`Eroare detaliată pentru ${modelName} (attempt ${attempt + 1}):`, err?.message || err);
      if (isOverloaded && attempt < retries) {
        const delay = 1000 * (attempt + 1); // 1s, then 2s
        await new Promise((res) => setTimeout(res, delay));
        continue;
      }
      break; // non-retryable error, move to next model
    }
  }
  return undefined;
}

for (const modelName of modelsToTry) {
  analysis = await tryGeminiModel(modelName, prompt);
  if (analysis) break;
}

// Fallback final gratuit, dacă toate variantele Gemini au eșuat
if (!analysis) {
  try {
    console.log("Toate modelele Gemini au eșuat, se încearcă Groq (Llama)...");
    const groqResult = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2000,
    });
    analysis = groqResult.choices[0]?.message?.content ?? undefined;
    if (analysis) {
      console.log("Succes cu Groq (Llama).");
    } else {
      console.error("Groq a răspuns dar fără conținut:", JSON.stringify(groqResult));
    }
  } catch (err: any) {
    console.error("Eroare detaliată pentru Groq:", err?.response?.data || err?.message || err);
  }
}

if (!analysis) {
  throw new Error("All AI agents are currently offline.");
}

    await prisma.characterMatch.create({
      data: {
        sessionId,
        characterId: fullCharacter.id,
        characterName: fullCharacter.name,
        similarity,
        narrative: analysis,
      },
    });

    return NextResponse.json({ analysis });
  } catch (err) {
    console.error("[character-report]", err);
    return NextResponse.json({ error: "Eroare la generarea analizei." }, { status: 500 });
  }
}