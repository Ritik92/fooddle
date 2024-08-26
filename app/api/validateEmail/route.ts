// src/app/api/validateEmail/route.ts

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email');
    
  if (!email) {
    return NextResponse.json({ message: 'Email query parameter is missing' }, { status: 400 });
  }

  try {
    // Await the Prisma query result
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    // Check if the user exists and return appropriate response
    if (user) {
      return NextResponse.json({ message: 'User exists' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'User does not exist' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
