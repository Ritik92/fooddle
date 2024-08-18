const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.customization.deleteMany({});
  await prisma.menuItem.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.menu.deleteMany({});
  await prisma.restaurant.deleteMany({});

  // Seed restaurants
  const restaurants = [
    { id: '1', img: '/pizzaNation.png', name: 'Pizza Nation', time: '12:00 pm', location: 'Cos' },
    { id: '2', img: '/restpic.png', name: 'Honey Cafe', time: '12:00 pm', location: 'Cos' },
    { id: '3', img: '/restpic2.png', name: 'The Dessert Club', time: '12:00 pm', location: 'Cos' },
    { id: '4', img: '/restpic2.png', name: 'Sip n Bites', time: '12:00 pm', location: 'Cos' },
    { id: '5', img: '/pizzaNation.png', name: 'Fashion Point Cos', time: '12:00 pm', location: 'Cos' },
    { id: '6', img: '/restpic.png', name: 'Bombay Munchery', time: '12:00 pm', location: 'Cos' },
    { id: '7', img: '/restpic2.png', name: 'JP Foods', time: '12:00 pm', location: 'G-block' },
    { id: '8', img: '/pizzaNation.png', name: 'Patiala Shahi', time: '12:00 pm', location: 'G-block' },
    { id: '9', img: '/pizzaNation.png', name: 'RP Fresh Soda', time: '12:00 pm', location: 'G-block' },
    { id: '10', img: '/restpic.png', name: 'The Brotherz Kitchen', time: '12:00 pm', location: 'G-block' },
    { id: '11', img: '/restpic.png', name: 'Amritsari Kulcha Zone', time: '12:00 pm', location: 'H-block' },
  ];

  for (const restaurant of restaurants) {
    await prisma.restaurant.create({
      data: {
        id: restaurant.id,
        img: restaurant.img,
        name: restaurant.name,
        location: restaurant.location,
        time: restaurant.time,
        menu: {
          create: {
            categories: {
              create: [
                {
                  name: 'Main Dishes',
                  items: {
                    create: [
                      {
                        name: `${restaurant.name} Special`,
                        price: 15.99,
                        customizations: {
                          create: [
                            { name: 'Extra topping', price: 2.50 },
                            { name: 'Large size', price: 3.00 },
                          ]
                        }
                      },
                      {
                        name: "Chef's Choice",
                        price: 18.99,
                        customizations: {
                          create: [
                            { name: 'Spicy', price: 1.00 },
                            { name: 'Gluten-free', price: 2.00 },
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  name: 'Drinks',
                  items: {
                    create: [
                      { name: 'Soda', price: 2.50 },
                      { name: 'Iced Tea', price: 3.00 },
                    ]
                  }
                }
              ]
            }
          }
        }
      }
    });
  }

  console.log("Seed data added successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
