-- AlterTable
ALTER TABLE "ItemResponse" ADD COLUMN     "textValue" TEXT,
ALTER COLUMN "value" DROP NOT NULL;
