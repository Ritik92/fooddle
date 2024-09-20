export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = req.nextUrl.searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: email as string },
      select: { isVendor: true, phoneNumber: true, address: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return the vendor status
    return NextResponse.json({isVendor: user.isVendor,
      phoneNumber: user.phoneNumber,
      address: user.address }, { status: 200 });
  } catch (error) {
    console.error('Error checking vendor status:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
