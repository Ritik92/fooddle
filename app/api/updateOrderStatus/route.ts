import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const { orderId, newStatus } = await request.json();

  if (!orderId || !newStatus) {
    return NextResponse.json({ error: 'Missing orderId or newStatus' }, { status: 400 });
  }

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    return NextResponse.json({ error: 'Error updating order status' }, { status: 500 });
  }
}