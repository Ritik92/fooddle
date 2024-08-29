export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma';
export async function GET(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const userId = searchParams.get('userId');
  
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
            status:'Pending'
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