import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Extract the menuid from the query parameters
  const { searchParams } = new URL(req.url);
  const menuItemId = searchParams.get('menuItemId');

  // Validate if menuid is provided
  if (!menuItemId) {
    return NextResponse.json({ error: "menuid is required" }, { status: 400 });
  }

  try {
    const restaurantData = await prisma.menuItem.findUnique({
      where: { id: menuItemId },
      include: {
        category: {
          include: {
            menu: {
              include: {
                restaurant: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!restaurantData || !restaurantData.category?.menu?.restaurant?.name) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
    }

    const name = restaurantData.category.menu.restaurant.name;

    // Wrap the name in an object to ensure it's serializable
    return NextResponse.json({ restaurantName: name });
    
  } catch (error) {
    console.error("Error fetching restaurant data:", error);
    return NextResponse.json({ error: "Failed to fetch restaurant data" }, { status: 500 });
  }
}
