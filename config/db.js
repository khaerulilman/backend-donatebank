const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
    return prisma;
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

module.exports = { prisma, connectDB };
