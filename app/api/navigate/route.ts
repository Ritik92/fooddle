import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: { isVendor: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return the vendor status
    return NextResponse.json({ isVendor: user.isVendor }, { status: 200 });
  } catch (error) {
    console.error('Error checking vendor status:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
