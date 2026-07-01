import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const patients = await prisma.patient.findMany({
    include: {
      psychologist: {
        select: { id: true, name: true, email: true, role: true },
      },
      appointments: true,
      notes: true,
    },
    orderBy: { updatedAt: 'desc' },
  });

  return NextResponse.json(patients);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { firstName, lastName, phone, email, birthDate, gender, psychologistId, status } = body;

  const patient = await prisma.patient.create({
    data: {
      firstName,
      lastName,
      phone,
      email,
      birthDate: birthDate ? new Date(birthDate) : undefined,
      gender,
      status,
      psychologistId,
    },
  });

  return NextResponse.json(patient, { status: 201 });
}
