import "dotenv/config";
import { prisma } from "@/lib/prisma";
import charactersData from "@/data/characters.json";

async function main() {
  const characters = (charactersData as { characters: any[] }).characters;
  let updated = 0;

  for (const char of characters) {
    if (!char.description) continue;

    const result = await prisma.character.updateMany({
      where: { name: char.name, animeSlug: char.animeId },
      data: { description: char.description },
    });

    updated += result.count;
  }

  console.log(`Updated ${updated} characters with descriptions.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());