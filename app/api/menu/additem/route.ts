import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // Get userId from query parameters
    const userId = req.nextUrl.searchParams.get('userId');

    // Get the body of the request
    const body = await req.json();
    const { newItem,categoryId } = body;

    if (!userId||!newItem||!categoryId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if user is a vendor
    if (user.isVendor) {
      const restaurant = await prisma.restaurant.findFirst({
        where: {
          vendorId: userId,
        },
        include: {
          menu: true,
        },
      });

      if (!restaurant || !restaurant.menu) {
        return NextResponse.json({ error: 'Restaurant or menu not found for the vendor' }, { status: 404 });
      }

      const newItems = await prisma.menuItem.create({
        data: {
          name:newItem.name,
          price:newItem.price,
          category: { connect: { id: categoryId } },
          restaurant: { connect: { id: restaurant.id } },
         
        },
      });
      return NextResponse.json({ newItems }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'User is not a vendor' }, { status: 403 });
    }
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
