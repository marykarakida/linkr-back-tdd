/* eslint-disable import/no-mutable-exports */
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

export function connectDb(): void {
  prisma = new PrismaClient();
}

export async function disconnectDb(): Promise<void> {
  await prisma?.$disconnect();
}

export { prisma };
