import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const psychologists = await prisma.user.findMany({
    where: { role: 'PSYCHOLOGIST' },
    include: { appointments: true },
  });

  return NextResponse.json(psychologists);
}
