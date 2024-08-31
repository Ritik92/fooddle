import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { use } from "react";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { userId} = body;
  try {
     const data=await prisma.user.findFirst({
        where:{
            id:userId
        },
        include:{
            restaurant:true
        }
     })
  
    return NextResponse.json(data.restaurant);
  } catch (error) {
    console.error("Error fetching restaurant data:", error);
    return NextResponse.json({ error: "Failed to fetch restaurant data" }, { status: 500 });
  }
}
