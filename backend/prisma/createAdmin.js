const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createAdmin() {
  await prisma.user.create({
    data: {
      email: "singh.1733@osu.edu",
      username: "prab.singh",
      password: env("ADMIN_PASSWORD"),
      role: "ADMIN",
    },
  });
}

createAdmin();
