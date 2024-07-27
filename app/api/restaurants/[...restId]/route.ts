import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

type MenuItem = {
    id: string;
    name: string;
    price: string;
  };
  
  type MenuCategory = {
    [category: string]: MenuItem[];
  };
  
  type Restaurant = {
    id: string;
    name: string;
    menu: MenuCategory;
  };
  const restaurantDetails: Record<string, Restaurant> = {
    '1': {
      id: '1',
      name: 'Pizza Nation',
      menu: {
        Pizzas: [
          { id: '1', name: 'Margherita', price: '₹100' },
          { id: '2', name: 'Pepperoni', price: '₹150' },
          { id: '3', name: 'Veggie Supreme', price: '₹180' },
          { id: '4', name: 'BBQ Chicken', price: '₹200' },
          { id: '5', name: 'Hawaiian', price: '₹170' },
        ],
        Drinks: [
          { id: '6', name: 'Coke', price: '₹50' },
          { id: '7', name: 'Pepsi', price: '₹60' },
          { id: '8', name: 'Lemonade', price: '₹70' },
          { id: '9', name: 'Iced Tea', price: '₹65' },
        ],
        Sides: [
          { id: '10', name: 'Garlic Bread', price: '₹80' },
          { id: '11', name: 'Chicken Wings', price: '₹120' },
          { id: '12', name: 'Mozzarella Sticks', price: '₹100' },
        ],
      },
    },
    '2': {
      id: '2',
      name: 'Desert Club',
      menu: {
        Desserts: [
          { id: '13', name: 'Cheesecake', price: '₹200' },
          { id: '14', name: 'Brownie', price: '₹150' },
          { id: '15', name: 'Tiramisu', price: '₹180' },
          { id: '16', name: 'Apple Pie', price: '₹160' },
          { id: '17', name: 'Ice Cream Sundae', price: '₹140' },
        ],
        Beverages: [
          { id: '18', name: 'Coffee', price: '₹100' },
          { id: '19', name: 'Tea', price: '₹80' },
          { id: '20', name: 'Hot Chocolate', price: '₹120' },
          { id: '21', name: 'Milkshake', price: '₹130' },
        ],
        SpecialtyDrinks: [
          { id: '22', name: 'Frappe', price: '₹150' },
          { id: '23', name: 'Smoothie', price: '₹140' },
          { id: '24', name: 'Iced Latte', price: '₹110' },
        ],
      },
    },
  };
export async function GET(request: Request, context: { params: { restId: string } }) {
    const { restId } = context.params;
     const id=restId
    if (!restId) {
       return  NextResponse.json('Restaurant ID is required', { status: 400 });
    }
  if (id) {
    const restaurant = restaurantDetails[id];

    if (restaurant) {
        return NextResponse.json(restaurant);
    } else {
        return  NextResponse.json({ error: 'Restaurant not found' });
    }
  } else {
    return NextResponse.json({ error: 'Invalid request' });
  }
}
