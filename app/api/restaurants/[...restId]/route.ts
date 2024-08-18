import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request, context: { params: { restId: string[] } }) {
    const { restId } = context.params;

    if (!restId || restId.length === 0) {
        return NextResponse.json({ error: 'Restaurant ID is required' }, { status: 400 });
    }

    // Join the array elements if it's an array, or use the first element if it's a single-element array
    const id = Array.isArray(restId) ? restId.join('/') : restId;

    try {
        const restaurant = await prisma.restaurant.findUnique({
            where: { id },
            include: {
                menu: {
                    include: {
                        categories: {
                            include: {
                                items: {
                                    include: {
                                        customizations: true, // Fetch customizations for each menu item
                                        orderItems: {
                                            include: {
                                                customizations: true // Fetch customizations for each order item
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        if (restaurant) {
            return NextResponse.json(restaurant);
        } else {
            return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error fetching restaurant data:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
