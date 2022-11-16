import { prisma } from '@/config/prisma';

async function cleanDb() {
  await prisma.$queryRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`;
}

export { cleanDb };
