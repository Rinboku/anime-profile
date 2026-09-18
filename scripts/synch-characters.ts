import "dotenv/config";
import { prisma } from "@/lib/prisma";
import { VECTOR_KEY_ORDER } from "@/data/vectorKeyOrder";
import charactersData from "@/data/characters.json";

async function main() {
  const jsonCharacters = (charactersData as { characters: any[] }).characters;

  // Cheie de potrivire: nume + anime (nu avem id-ul JSON salvat în DB)
  const jsonKeys = new Set(
    jsonCharacters.map((c) => `${c.name}::${c.animeId}`)
  );

  let created = 0;
  let updated = 0;

  for (const char of jsonCharacters) {
    const vector = VECTOR_KEY_ORDER.map((key) => char.traits[key] ?? 0.5);

    const existing = await prisma.character.findFirst({
      where: { name: char.name, animeSlug: char.animeId },
    });

    if (existing) {
      await prisma.character.update({
        where: { id: existing.id },
        data: { vector, description: char.description ?? existing.description },
      });
      updated++;
    } else {
      await prisma.character.create({
        data: {
          name: char.name,
          animeSlug: char.animeId,
          description: char.description ?? null,
          vector,
        },
      });
      created++;
    }
  }

  // Găsește personajele din DB care NU mai există în characters.json
  const dbCharacters = await prisma.character.findMany();
  const toRemove = dbCharacters.filter(
    (c) => !jsonKeys.has(`${c.name}::${c.animeSlug}`)
  );

  console.log(`\n--- Sincronizare completă ---`);
  console.log(`Create: ${created}`);
  console.log(`Actualizate: ${updated}`);
  console.log(`\nPersonaje în DB care NU mai apar în characters.json (${toRemove.length}):`);
  toRemove.forEach((c) => console.log(`  - ${c.name} (${c.animeSlug}) [id: ${c.id}]`));
  console.log(`\nAcestea NU au fost șterse automat. Rulează cu --delete-orphans ca să le elimini.`);

  if (process.argv.includes("--delete-orphans") && toRemove.length > 0) {
    const ids = toRemove.map((c) => c.id);
    const result = await prisma.character.deleteMany({ where: { id: { in: ids } } });
    console.log(`\nȘterse: ${result.count} personaje.`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());