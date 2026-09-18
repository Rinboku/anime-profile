import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
 
// La runtime (din API routes), aplicația folosește conexiunea prin pooler
// (DATABASE_URL), spre deosebire de prisma.config.ts, care e folosit doar
// de CLI pentru migrații și foloseste DIRECT_URL.
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
 
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};
 
export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter });
 
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
