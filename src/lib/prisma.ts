import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {prisma:PrismaClient}

export const prisma_client = 
globalForPrisma.prisma || new PrismaClient({log: ['query']})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma_client