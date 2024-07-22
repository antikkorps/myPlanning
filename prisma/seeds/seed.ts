import { PrismaClient } from "@prisma/client"
import { faker } from "@faker-js/faker"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  const family = await prisma.family.create({
    data: {
      name: "Famille Doe",
      address: "1 rue de la Paix",
      city: "Paris",
      postalCode: "75000",
      country: "France",
    },
  })
  const usersToCreate = [
    { email: "papa@famille.com", isHead: true },
    { email: "maman@famille.com", isHead: true },
    { email: "enfant@famille.com", isHead: false },
  ]

  for (const { email, isHead } of usersToCreate) {
    const userExists = await prisma.user.findUnique({
      where: { email },
    })

    if (!userExists) {
      const hashedPassword = await bcrypt.hash("password", 10)
      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: faker.person.firstName(),
          isHead,
        },
      })
    }
  }

  const users = await prisma.user.findMany()

  for (const user of users) {
    for (let i = 0; i < 20; i++) {
      await prisma.event.create({
        data: {
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          startDate: faker.date.future(),
          endDate: faker.date.future(),
          userId: user.id,
          familyId: family.id,
        },
      })

      await prisma.reminder.create({
        data: {
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          remindAt: faker.date.future(),
          userId: user.id,
        },
      })
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    console.log("Seeding des données effectué avec succès.")
  })
