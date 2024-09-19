const { PrismaClient } = require('@prisma/client');

 const prisma = new PrismaClient();

  

async function main() {
  // Find the Pizza Nation restaurant
  const pizzaNation = await prisma.restaurant.findUnique({
    where: { name: 'The Dessert Club' },
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
      name: "Bubble Waffle",
      items: [
        { name: "Oreo King", price: 200 },
        { name: "Oreo Queen", price: 120 },
        { name: "Nutella King", price: 200 },
        { name: "Nutella Queen", price: 120 },
        { name: "Brownie King", price: 200 },
        { name: "Brownie Queen", price: 120 },
        { name: "Ferrero King", price: 200 },
        { name: "Ferrero Queen", price: 120 },
        { name: "Pistachio King", price: 200 },
        { name: "Pistachio Queen", price: 120 },
        { name: "Chocolate King", price: 200 },
        { name: "Chocolate Queen", price: 120 },
        { name: "Red Velvet King", price: 200 },
        { name: "Red Velvet Queen", price: 120 },
        { name: "Blue Berry King", price: 200 },
        { name: "Blue Berry Queen", price: 120 },
        { name: "Honey Almond King", price: 200 },
        { name: "Honey Almond Queen", price: 120 },
      ],
    },
    {
      name: "Square Waffle",
      items: [
        { name: "Kitkat King", price: 200 },
        { name: "Kitkat Queen", price: 120 },
        { name: "Nutella King", price: 200 },
        { name: "Nutella Queen", price: 120 },
        { name: "Chocolate King", price: 200 },
        { name: "Chocolate Queen", price: 120 },
        { name: "Fresh Fruit King", price: 200 },
        { name: "Fresh Fruit Queen", price: 120 },
        { name: "Maple Syrup King", price: 200 },
        { name: "Maple Syrup Queen", price: 120 },
        { name: "Biscoff King", price: 200 },
        { name: "Biscoff Queen", price: 120 },
      ],
    },
    {
      name: "Hot Brownie Sundae",
      items: [
        { name: "Brownie Choco Fudge", price: 120 },
      ],
    },
    {
      name: "Hot Liquids",
      items: [
        { name: "Hot Choco Hazelnut", price: 75 },
        { name: "Hot Choco Nutella", price: 75 },
      ],
    },
    {
      name: "Dessert Club Special",
      items: [
        { name: "Dragon Biscuits", price: 25 },
        { name: "Fruit Punch", price: 150 },
      ],
    },
    {
      name: "Ice Cream Rolls Sundae",
      items: [
        { name: "Special Fresh Fruit", price: 159 },
        { name: "Kinder Bueno", price: 159 },
        { name: "Ferrero", price: 159 },
      ],
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