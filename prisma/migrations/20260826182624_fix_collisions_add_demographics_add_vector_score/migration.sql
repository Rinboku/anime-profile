/*
  Warnings:

  - A unique constraint covering the columns `[sessionId,itemId,episodeTitle]` on the table `ItemResponse` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ItemResponse_sessionId_itemId_key";

-- AlterTable
ALTER TABLE "CharacterMatch" ADD COLUMN     "characterId" TEXT;

-- AlterTable
ALTER TABLE "FactorScore" ADD COLUMN     "normalizedScore" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "ItemResponse" ADD COLUMN     "episodeTitle" TEXT;

-- AlterTable
ALTER TABLE "Respondent" ADD COLUMN     "age" INTEGER,
ADD COLUMN     "citizenship" TEXT,
ADD COLUMN     "conditionType" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "dailyAnimeEpisodes" INTEGER,
ADD COLUMN     "dailyIndoorHours" TEXT,
ADD COLUMN     "education" TEXT,
ADD COLUMN     "ethnicity" TEXT,
ADD COLUMN     "financeFeel" TEXT,
ADD COLUMN     "firstAnimeAgeRange" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "hasCondition" BOOLEAN,
ADD COLUMN     "incomeSource" TEXT,
ADD COLUMN     "languageLevel" TEXT,
ADD COLUMN     "living" TEXT,
ADD COLUMN     "occupation" TEXT,
ADD COLUMN     "relationshipStatus" TEXT,
ADD COLUMN     "religion" TEXT,
ADD COLUMN     "watchLanguage" TEXT,
ADD COLUMN     "watchesInNativeLanguage" BOOLEAN;

-- CreateIndex
CREATE UNIQUE INDEX "ItemResponse_sessionId_itemId_episodeTitle_key" ON "ItemResponse"("sessionId", "itemId", "episodeTitle");
