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
  await prisma.user.deleteMany({});

  // Seed users (11 vendors + 4 customers)
  const users = [
    { id: 'user-1', email: 'vendor1@example.com', isVendor: true },
    { id: 'user-2', email: 'vendor2@example.com', isVendor: true },
    { id: 'user-3', email: 'vendor3@example.com', isVendor: true },
    { id: 'user-4', email: 'vendor4@example.com', isVendor: true },
    { id: 'user-5', email: 'vendor5@example.com', isVendor: true },
    { id: 'user-6', email: 'vendor6@example.com', isVendor: true },
    { id: 'user-7', email: 'vendor7@example.com', isVendor: true },
    { id: 'user-8', email: 'vendor8@example.com', isVendor: true },
    { id: 'user-9', email: 'vendor9@example.com', isVendor: true },
    { id: 'user-10', email: 'vendor10@example.com', isVendor: true },
    { id: 'user-11', email: 'vendor11@example.com', isVendor: true },
    { id: 'user-12', email: 'customer1@example.com', isVendor: false },
    { id: 'user-13', email: 'customer2@example.com', isVendor: false },
    { id: 'user-14', email: 'customer3@example.com', isVendor: false },
    { id: 'user-15', email: 'customer4@example.com', isVendor: false },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        isVendor: user.isVendor,
      },
    });
  }

  // Seed restaurants (each with a unique vendor)
  const restaurants = [
    { id: '1', img: '/pizzaNation.png', name: 'Pizza Nation', time: '12:00 pm', location: 'Cos', vendorId: 'user-1' },
    { id: '2', img: '/restpic.png', name: 'Honey Cafe', time: '12:00 pm', location: 'Cos', vendorId: 'user-2' },
    { id: '3', img: '/restpic2.png', name: 'The Dessert Club', time: '12:00 pm', location: 'Cos', vendorId: 'user-3' },
    { id: '4', img: '/restpic2.png', name: 'Sip n Bites', time: '12:00 pm', location: 'Cos', vendorId: 'user-4' },
    { id: '5', img: '/pizzaNation.png', name: 'Fashion Point Cos', time: '12:00 pm', location: 'Cos', vendorId: 'user-5' },
    { id: '6', img: '/restpic.png', name: 'Bombay Munchery', time: '12:00 pm', location: 'Cos', vendorId: 'user-6' },
    { id: '7', img: '/restpic2.png', name: 'JP Foods', time: '12:00 pm', location: 'G-block', vendorId: 'user-7' },
    { id: '8', img: '/pizzaNation.png', name: 'Patiala Shahi', time: '12:00 pm', location: 'G-block', vendorId: 'user-8' },
    { id: '9', img: '/pizzaNation.png', name: 'RP Fresh Soda', time: '12:00 pm', location: 'G-block', vendorId: 'user-9' },
    { id: '10', img: '/restpic.png', name: 'The Brotherz Kitchen', time: '12:00 pm', location: 'G-block', vendorId: 'user-10' },
    { id: '11', img: '/restpic.png', name: 'Amritsari Kulcha Zone', time: '12:00 pm', location: 'H-block', vendorId: 'user-11' },
  ];

  for (const restaurant of restaurants) {
    await prisma.restaurant.create({
      data: {
        id: restaurant.id,
        img: restaurant.img,
        name: restaurant.name,
        location: restaurant.location,
        time: restaurant.time,
        vendor: {
          connect: {
            id: restaurant.vendorId,
          },
        },
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
                        restaurant: {
                          connect: {
                            id: restaurant.id,
                          },
                        },
                        customizations: {
                          create: [
                            { name: 'Extra topping', price: 2.50 },
                            { name: 'Large size', price: 3.00 },
                          ],
                        },
                      },
                      {
                        name: "Chef's Choice",
                        price: 18.99,
                        restaurant: {
                          connect: {
                            id: restaurant.id,
                          },
                        },
                        customizations: {
                          create: [
                            { name: 'Spicy', price: 1.00 },
                            { name: 'Gluten-free', price: 2.00 },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  name: 'Drinks',
                  items: {
                    create: [
                      {
                        name: 'Soda',
                        price: 2.50,
                        restaurant: {
                          connect: {
                            id: restaurant.id,
                          },
                        },
                      },
                      {
                        name: 'Iced Tea',
                        price: 3.00,
                        restaurant: {
                          connect: {
                            id: restaurant.id,
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      },
    });
  }

  console.log('Seed data added successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
