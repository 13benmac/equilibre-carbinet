import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const patient = await prisma.patient.findUnique({
    where: { id },
    include: {
      psychologist: {
        select: { id: true, name: true, email: true },
      },
      appointments: {
        include: { psychologist: true },
        orderBy: { startAt: 'desc' },
      },
      notes: true,
    },
  });

  if (!patient) return NextResponse.json({ error: 'Patient non trouvé' }, { status: 404 });

  return NextResponse.json(patient);
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const patient = await prisma.patient.update({
    where: { id },
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      email: body.email,
      birthDate: body.birthDate ? new Date(body.birthDate) : undefined,
      gender: body.gender,
      status: body.status,
      psychologistId: body.psychologistId,
    },
  });

  return NextResponse.json(patient);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.patient.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
