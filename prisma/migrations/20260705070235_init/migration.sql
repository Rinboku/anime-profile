-- CreateTable
CREATE TABLE "Respondent" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "consentGiven" BOOLEAN NOT NULL DEFAULT false,
    "locale" TEXT,

    CONSTRAINT "Respondent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizSession" (
    "id" TEXT NOT NULL,
    "respondentId" TEXT NOT NULL,
    "animeSlug" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "QuizSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemResponse" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ItemResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FactorScore" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "scaleName" TEXT NOT NULL,
    "rawScore" DOUBLE PRECISION NOT NULL,
    "zScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FactorScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "animeSlug" TEXT NOT NULL,
    "vector" DOUBLE PRECISION[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterMatch" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "characterName" TEXT NOT NULL,
    "similarity" DOUBLE PRECISION NOT NULL,
    "narrative" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CharacterMatch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "QuizSession_respondentId_idx" ON "QuizSession"("respondentId");

-- CreateIndex
CREATE INDEX "QuizSession_animeSlug_idx" ON "QuizSession"("animeSlug");

-- CreateIndex
CREATE INDEX "ItemResponse_sessionId_idx" ON "ItemResponse"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "ItemResponse_sessionId_itemId_key" ON "ItemResponse"("sessionId", "itemId");

-- CreateIndex
CREATE INDEX "FactorScore_sessionId_idx" ON "FactorScore"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "FactorScore_sessionId_scaleName_key" ON "FactorScore"("sessionId", "scaleName");

-- CreateIndex
CREATE INDEX "Character_animeSlug_idx" ON "Character"("animeSlug");

-- CreateIndex
CREATE UNIQUE INDEX "CharacterMatch_sessionId_key" ON "CharacterMatch"("sessionId");

-- AddForeignKey
ALTER TABLE "QuizSession" ADD CONSTRAINT "QuizSession_respondentId_fkey" FOREIGN KEY ("respondentId") REFERENCES "Respondent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemResponse" ADD CONSTRAINT "ItemResponse_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "QuizSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FactorScore" ADD CONSTRAINT "FactorScore_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "QuizSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterMatch" ADD CONSTRAINT "CharacterMatch_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "QuizSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
