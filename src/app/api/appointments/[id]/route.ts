import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();

  const appointment = await prisma.appointment.update({
    where: { id: params.id },
    data: {
      startAt: body.startAt ? new Date(body.startAt) : undefined,
      endAt: body.endAt ? new Date(body.endAt) : undefined,
      status: body.status,
      type: body.type,
      notes: body.notes,
    },
  });

  return NextResponse.json(appointment);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.appointment.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
