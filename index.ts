import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Connect the client
  await prisma.$connect();

  await prisma.user.create({
    data: {
      email: "luca@test.com",
      password: "123456",
    },
  });
  const users = await prisma.user.findMany();

  console.dir(users, { depth: Infinity });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
