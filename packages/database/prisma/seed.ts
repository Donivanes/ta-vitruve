import { PrismaClient, Athlete } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding...`);

  const amountOfAthletes = 300;

  const athletes: Athlete[] = [];

  for (let i = 0; i < amountOfAthletes; i++) {
    const athlete = {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      age: faker.number.int({ min: 16, max: 60 }),
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
      team: faker.company.name(),
    };

    athletes.push(athlete);
  }

  const addAthletes = async () =>
    await prisma.athlete.createMany({ data: athletes });

  await addAthletes();

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
