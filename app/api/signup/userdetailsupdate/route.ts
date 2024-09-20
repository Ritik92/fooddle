import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    // Retrieve the session
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Safely access the user ID from the session
    const userId = (session.user as any).id;
    
    // Parse request body
    const { name, phoneNumber, address } = await req.json();

    // Ensure required fields are present
    if (!userId) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    // Perform the update
    const response = await prisma.user.update({
      where: { id: userId },
      data: {
        name: name || undefined,        // Only update if provided
        phoneNumber: phoneNumber || undefined,
        address: address || undefined,
      },
    });

    // Return success response
    return NextResponse.json({ message: 'User Details Updated', user: response }, { status: 200 });

  } catch (error) {
    console.error('Update failed:', error);
    return NextResponse.json({ error: 'Failed to update user details' }, { status: 500 });
  }
}
