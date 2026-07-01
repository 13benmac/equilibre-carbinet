import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const appointments = await prisma.appointment.findMany({
    include: {
      patient: true,
      psychologist: true,
    },
    orderBy: { startAt: 'asc' },
  });

  return NextResponse.json(appointments);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { patientId, psychologistId, startAt, endAt, status, type, notes } = body;

  const appointment = await prisma.appointment.create({
    data: {
      patientId,
      psychologistId,
      startAt: new Date(startAt),
      endAt: new Date(endAt),
      status,
      type,
      notes,
    },
  });

  return NextResponse.json(appointment, { status: 201 });
}
