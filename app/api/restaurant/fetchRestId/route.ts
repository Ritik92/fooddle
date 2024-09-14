// pages/api/orders/create.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userID } = body;
   
    if (!userID) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    // Find the restaurant using vendorId
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        vendorId: userID,
      },
    });

    if (!restaurant) {
      return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
    }

    return NextResponse.json({ restaurant }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
