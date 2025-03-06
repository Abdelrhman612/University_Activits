import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const ConnectDB = () => {
  try {
    prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error");
    process.exit(1);
  }
};
