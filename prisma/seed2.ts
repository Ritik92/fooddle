const { PrismaClient } = require('@prisma/client');

 const prisma = new PrismaClient();

  

async function main() {
  // Find the Pizza Nation restaurant
  const pizzaNation = await prisma.restaurant.findUnique({
    where: { name: 'Pizza Nation' },
  });

  if (!pizzaNation) {
    console.error('Pizza Nation restaurant not found');
    return;
  }

  // Create or find the menu for Pizza Nation
  let menu = await prisma.menu.findUnique({
    where: { restaurantId: pizzaNation.id },
  });

  if (!menu) {
    menu = await prisma.menu.create({
      data: { restaurantId: pizzaNation.id },
    });
  }

  // Define categories and their items
  const categories = [
    {
      name: 'Classic Veg',
      items: [
        { name: 'Margherita', prices: [99, 219, 349] },
      ]
    },
    {
      name: 'Classic Non-Veg',
      items: [
        { name: 'Chicken Salami', prices: [139, 269, 379] },
      ]
    },
    {
      name: 'Simply Veg',
      items: [
        { name: 'Spring fling', prices: [139, 269, 399] },
        { name: "Farmer's Special", prices: [139, 269, 399] },
        { name: 'Spicy Mexican', prices: [139, 269, 399] },
        { name: 'Veg. Hawaiian', prices: [139, 269, 399] },
      ]
    },
    {
      name: 'Simply Non-Veg',
      items: [
        { name: 'BBQ Chicken', prices: [149, 289, 419] },
        { name: 'Tandoori Chicken', prices: [149, 289, 419] },
        { name: 'Spicy Chk.Mexican', prices: [149, 289, 419] },
        { name: 'Chicken Hawaiian', prices: [149, 289, 419] },
      ]
    },
    {
      name: 'Premium Veg',
      items: [
        { name: 'Peri Peri Paneer', prices: [159, 309, 429] },
        { name: 'American Delight', prices: [159, 309, 429] },
        { name: 'Mexican Delight', prices: [159, 309, 429] },
        { name: 'Classical Paneer', prices: [159, 309, 429] },
        { name: 'Health Smart', prices: [159, 309, 429] },
        { name: "Pizza Nation's Spl", prices: [169, 329, 449] },
      ]
    },
    {
      name: 'Premium Non-Veg',
      items: [
        { name: 'Peri Peri Chicken', prices: [179, 319, 449] },
        { name: 'American Delite', prices: [179, 319, 449] },
        { name: 'Smoked Chicken', prices: [179, 319, 449] },
        { name: 'Butter Chicken', prices: [179, 319, 449] },
        { name: 'Chicken Bomber', prices: [179, 319, 449] },
        { name: "Pizza Nation's Spl", prices: [189, 329, 469] },
      ]
    },
    {
      name: 'Pasta',
      items: [
        { name: 'Veg. White Sauce', price: 79 },
        { name: 'Veg. Red Sauce', price: 79 },
        { name: 'Veg. Thai Red Curry', price: 79 },
        { name: 'Veg. Hong Kong', price: 79 },
        { name: 'Non-Veg. White Sauce', price: 89 },
        { name: 'Non-Veg. Red Sauce', price: 89 },
        { name: 'Non-Veg. Thai Red Curry', price: 89 },
        { name: 'Non-Veg. Hong Kong', price: 89 },
      ]
    },
    {
      name: 'Garlic Bread',
      items: [
        { name: 'Cheese', price: 99 },
        { name: 'Black Cheese (Mush.+Olives)', price: 109 },
        { name: 'Supreme', price: 109 },
        { name: 'Chicken Tikka Cheese', price: 109 },
      ]
    },
    {
      name: 'Drinks',
      items: [
        { name: 'Hot Coffee', price: 35 },
        { name: 'Fresh Lime Soda', price: 39 },
        { name: 'Lemon Ice Tea', price: 49 },
        { name: 'Peach Ice Tea', price: 49 },
        { name: 'Cold Coffee', price: 69 },
        { name: 'Cold Coffee with Ice Cream', price: 79 },
        { name: 'Soft Drink', price: 0 }, // MRP
      ]
    },
  ];

 for (const category of categories) {
    const createdCategory = await prisma.category.create({
      data: {
        name: category.name,
        menuId: menu.id,
      },
    });

    for (const item of category.items) {
      if ('prices' in item && Array.isArray(item.prices)) {
        // Create items with size variations
        await prisma.menuItem.create({
          data: {
            name: `${item.name} (Regular)`,
            price: item.prices[0],
            categoryId: createdCategory.id,
            restaurantId: pizzaNation.id,
          },
        });
        await prisma.menuItem.create({
          data: {
            name: `${item.name} (Medium)`,
            price: item.prices[1],
            categoryId: createdCategory.id,
            restaurantId: pizzaNation.id,
          },
        });
        await prisma.menuItem.create({
          data: {
            name: `${item.name} (Large)`,
            price: item.prices[2],
            categoryId: createdCategory.id,
            restaurantId: pizzaNation.id,
          },
        });
      } else if ('price' in item) {
        // Create single price items
        await prisma.menuItem.create({
          data: {
            name: item.name,
            price: item.price,
            categoryId: createdCategory.id,
            restaurantId: pizzaNation.id,
          },
        });
      }
    }
  }

  console.log('Pizza Nation menu seeded successfully.');
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });