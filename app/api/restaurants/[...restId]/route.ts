import { NextRequest, NextResponse } from "next/server";

export function GET(
  req: NextRequest,
  { params }: { params: { restId: string[] } }
) {
  console.log(params.restId[0]); 
  return NextResponse.json({
    message: "Handler ",
  });
}