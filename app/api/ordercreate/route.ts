// pages/api/orders/create.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, items, totalAmount, restaurantId } = body;

    // Find the user
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
        isVendor:false
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Find the restaurant
   

    // Create the order
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        totalAmount,
        status: 'Received',
        restaurantId: restaurantId,
        items: {
          create: items.map((item: any) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            customizations: {
              connect: item.customizationIds.map((id: string) => ({
                id,
              })),
            },
          })),
        },
      },
      include: {
        items: {
          include: {
            menuItem: true,
            customizations: true,
          },
        },
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}



export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    let orders;
    if (user.isVendor) {
      const restaurant = await prisma.restaurant.findFirst({
        where: {
          vendorId: userId,
        },
      });
    
      if (!restaurant) {
        return NextResponse.json({ error: 'Restaurant not found for the vendor' }, { status: 404 });
      }
    
      orders = await prisma.order.findMany({
        where: {
          restaurantId: restaurant.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          items: {
            include: {
              menuItem: {
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
              },
              customizations: true,
            },
          },
        },
      });
    } else {
      orders = await prisma.order.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          items: {
            include: {
              menuItem: {
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
              },
              customizations: true,
            },
          },
        },
      });
    }
    

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}