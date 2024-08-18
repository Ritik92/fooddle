import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    
    const restaurantData = await prisma.restaurant.findMany();
    return NextResponse.json(restaurantData);
  } catch (error) {
    console.error("Error fetching restaurant data:", error);
    return NextResponse.json({ error: "Failed to fetch restaurant data" }, { status: 500 });
  }
}
