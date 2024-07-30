import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

type CustomizationOption = {
  name: string;
  price: number;
};

type Customization = {
  size?: CustomizationOption[];
  addOns?: CustomizationOption[];
};

type MenuItem = {
  id: string;
  name: string;
  price: string;
  customizations?: Customization;
};

type MenuCategory = {
  [category: string]: MenuItem[];
};

type Restaurant = {
  id: string;
  name: string;
  menu: MenuCategory;
  deliveryTime: string;
  closingTime: string;
};

const restaurantDetails: Record<string, Restaurant> = {
  '1': {
    id: '1',
    name: 'Pizza Nation',
    menu: {
      Pizzas: [
        {
          id: '1',
          name: 'Margherita',
          price: '₹100',
          customizations: {
            size: [
              { name: 'Small', price: 100 },
              { name: 'Medium', price: 200 },
              { name: 'Large', price: 300 },
              { name: 'Extra large', price: 350 },
            ],
            addOns: [
              { name: 'Extra cheese', price: 50 },
              { name: 'Cheese crust', price: 50 },
            ],
          },
        },
        {
          id: '2',
          name: 'Pepperoni',
          price: '₹150',
          customizations: {
            size: [
              { name: 'Small', price: 150 },
              { name: 'Medium', price: 250 },
              { name: 'Large', price: 350 },
              { name: 'Extra large', price: 400 },
            ],
            addOns: [
              { name: 'Extra pepperoni', price: 60 },
              { name: 'Cheese crust', price: 50 },
            ],
          },
        },
        { id: '3', name: 'Veggie Supreme', price: '₹180' },
        { id: '4', name: 'BBQ Chicken', price: '₹200' },
        { id: '5', name: 'Hawaiian', price: '₹170' },
      ],
      Drinks: [
        {
          id: '6',
          name: 'Coke',
          price: '₹50',
          customizations: {
            size: [
              { name: 'Small', price: 50 },
              { name: 'Medium', price: 70 },
              { name: 'Large', price: 90 },
            ],
            addOns: [
              { name: 'Ice', price: 0 },
              { name: 'Lemon', price: 10 },
            ],
          },
        },
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
    deliveryTime: '30 mins',
    closingTime: '12:00 PM',
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
