import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@equilibre-psy.bj' },
    update: {},
    create: {
      email: 'admin@equilibre-psy.bj',
      name: 'Administrateur',
      password: await bcrypt.hash('password123', 10),
      role: 'ADMIN',
    },
  });

  const psychologues = await Promise.all([
    prisma.user.upsert({
      where: { email: 'kodjovi@equilibre-psy.bj' },
      update: {},
      create: {
        email: 'kodjovi@equilibre-psy.bj',
        name: 'Dr. Kodjovi Amoussou',
        password: await bcrypt.hash('password123', 10),
        role: 'PSYCHOLOGIST',
      },
    }),
    prisma.user.upsert({
      where: { email: 'adjayi@equilibre-psy.bj' },
      update: {},
      create: {
        email: 'adjayi@equilibre-psy.bj',
        name: 'Dr. Adjayi Hounkpatin',
        password: await bcrypt.hash('password123', 10),
        role: 'PSYCHOLOGIST',
      },
    }),
  ]);

  const patients = await Promise.all([
    prisma.patient.upsert({
      where: { email: 'fatima.alassan@example.com' },
      update: {},
      create: {
        firstName: 'Fatima',
        lastName: 'Alassan',
        phone: '+22997001122',
        email: 'fatima.alassan@example.com',
        gender: 'FEMALE',
      },
    }),
    prisma.patient.upsert({
      where: { email: 'kofi.mensah@example.com' },
      update: {},
      create: {
        firstName: 'Kofi',
        lastName: 'Mensah',
        phone: '+22996554433',
        email: 'kofi.mensah@example.com',
        gender: 'MALE',
      },
    }),
  ]);

  await prisma.appointment.createMany({
    data: [
      {
        patientId: patients[0].id,
        psychologistId: psychologues[0].id,
        startAt: new Date('2026-06-27T09:00:00.000Z'),
        endAt: new Date('2026-06-27T09:50:00.000Z'),
        status: 'CONFIRMED',
        type: 'INDIVIDUAL',
      },
      {
        patientId: patients[1].id,
        psychologistId: psychologues[1].id,
        startAt: new Date('2026-06-27T10:30:00.000Z'),
        endAt: new Date('2026-06-27T11:20:00.000Z'),
        status: 'CONFIRMED',
        type: 'COUPLE',
      },
    ],
  });

  await prisma.note.create({
    data: {
      patientId: patients[0].id,
      authorId: psychologues[0].id,
      content: 'Premier contact, suivi individuel initial.',
    },
  });

  console.log('Seed terminé');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
