import prisma from '@/lib/prisma';  // Import your Prisma client instance
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body
    const { isOpen, userID }: { isOpen: boolean; userID: string } = await req.json();

    // Find the user and include their associated restaurant
    const user = await prisma.user.findUnique({
      where: { id: userID },
      include: { restaurant: true }, // Include related restaurant data
    });

    // Check if user and associated restaurant exist
    if (!user || !user.restaurant) {
      return NextResponse.json({ message: 'Restaurant not found for the given user ID' }, { status: 404 });
    }

    // Update the isOnline field of the restaurant
    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: user.restaurant.id },
      data: { isOnline:isOpen },
    });

    // Return a successful response with updated restaurant data
    return NextResponse.json({ message: 'Mode toggled successfully', restaurant: updatedRestaurant }, { status: 200 });

  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
