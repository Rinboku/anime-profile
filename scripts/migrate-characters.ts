import "dotenv/config";

import { prisma } from "@/lib/prisma";
import { VECTOR_KEY_ORDER } from "@/data/vectorKeyOrder";
import charactersData from "@/data/characters.json";

async function main() {
  const characters = (charactersData as { characters: any[] }).characters;

  for (const char of characters) {
    const vector = VECTOR_KEY_ORDER.map((key) => char.traits[key] ?? 0.5);

    await prisma.character.create({
      data: {
        name: char.name,
        animeSlug: char.animeId,
        vector,
      },
    });
  }

  console.log(`Migrated ${characters.length} characters.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());