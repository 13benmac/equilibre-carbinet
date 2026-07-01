import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const psychologist = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      appointments: {
        include: { patient: true },
        orderBy: { startAt: 'asc' },
      },
    },
  });

  if (!psychologist) return NextResponse.json({ error: 'Psychologue non trouvé' }, { status: 404 });

  return NextResponse.json(psychologist);
}
