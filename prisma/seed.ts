// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();

// async function main() {
//   // Clear existing data
//   await prisma.orderItem.deleteMany({});
//   await prisma.order.deleteMany({});
//   await prisma.customization.deleteMany({});
//   await prisma.menuItem.deleteMany({});
//   await prisma.category.deleteMany({});
//   await prisma.menu.deleteMany({});
//   await prisma.restaurant.deleteMany({});
//   await prisma.user.deleteMany({});

//   // Seed users (11 vendors + 4 customers)
//   const users = [
//     { id: 'user-1', email: 'vendor1@example.com', isVendor: true },
//     { id: 'user-2', email: 'vendor2@example.com', isVendor: true },
//     { id: 'user-3', email: 'vendor3@example.com', isVendor: true },
//     { id: 'user-4', email: 'vendor4@example.com', isVendor: true },
//     { id: 'user-5', email: 'vendor5@example.com', isVendor: true },
//     { id: 'user-6', email: 'vendor6@example.com', isVendor: true },
//     { id: 'user-7', email: 'vendor7@example.com', isVendor: true },
//     { id: 'user-8', email: 'vendor8@example.com', isVendor: true },
//     { id: 'user-9', email: 'vendor9@example.com', isVendor: true },
//     { id: 'user-10', email: 'vendor10@example.com', isVendor: true },
//     { id: 'user-11', email: 'vendor11@example.com', isVendor: true },
//     { id: 'user-12', email: 'customer1@example.com', isVendor: false },
//     { id: 'user-13', email: 'customer2@example.com', isVendor: false },
//     { id: 'user-14', email: 'customer3@example.com', isVendor: false },
//     { id: 'user-15', email: 'customer4@example.com', isVendor: false },
//   ];

//   for (const user of users) {
//     await prisma.user.create({
//       data: {
//         id: user.id,
//         email: user.email,
//         isVendor: user.isVendor,
//       },
//     });
//   }

//   // Seed restaurants (each with a unique vendor)
//   const restaurants = [
//     { id: '1', img: '/pic6p.jpg', name: 'Pizza Nation', openingTime: '11:00', closingTime: '22:00', location: 'Cos', vendorId: 'user-1', deliveryCharge: 2.50 },
//     { id: '2', img: '/pic2.jpg', name: 'Honey Cafe', openingTime: '08:00', closingTime: '20:00', location: 'Cos', vendorId: 'user-2', deliveryCharge: 1.50 },
//     { id: '3', img: '/pic3.jpg', name: 'The Dessert Club', openingTime: '10:00', closingTime: '21:00', location: 'Cos', vendorId: 'user-3', deliveryCharge: 3.00 },
//     { id: '4', img: '/pic4.jpg', name: 'Sip n Bites', openingTime: '09:00', closingTime: '23:00', location: 'Cos', vendorId: 'user-4', deliveryCharge: 2.00 },
//     { id: '5', img: '/pic5.jpg', name: 'Fashion Point Cos', openingTime: '10:00', closingTime: '22:00', location: 'Cos', vendorId: 'user-5', deliveryCharge: 2.75 },
//     { id: '6', img: '/pic6.jpg', name: 'Bombay Munchery', openingTime: '11:30', closingTime: '23:30', location: 'Cos', vendorId: 'user-6', deliveryCharge: 3.50 },
//     { id: '7', img: '/pic7.jpg', name: 'JP Foods', openingTime: '07:00', closingTime: '21:00', location: 'G-block', vendorId: 'user-7', deliveryCharge: 1.75 },
//     { id: '8', img: '/pic1.jpg', name: 'Patiala Shahi', openingTime: '11:00', closingTime: '22:30', location: 'G-block', vendorId: 'user-8', deliveryCharge: 2.25 },
//     { id: '9', img: '/pizzaNation.png', name: 'RP Fresh Soda', openingTime: '09:00', closingTime: '20:00', location: 'G-block', vendorId: 'user-9', deliveryCharge: 1.00 },
//     { id: '10', img: '/restpic.png', name: 'The Brotherz Kitchen', openingTime: '10:30', closingTime: '23:00', location: 'G-block', vendorId: 'user-10', deliveryCharge: 3.25 },
//     { id: '11', img: '/restpic2.png', name: 'Amritsari Kulcha Zone', openingTime: '08:30', closingTime: '21:30', location: 'H-block', vendorId: 'user-11', deliveryCharge: 2.50 },
// ];


//   for (const restaurant of restaurants) {
//     await prisma.restaurant.create({
//       data: {
//         id: restaurant.id,
//         img: restaurant.img,
//         name: restaurant.name,
//         location: restaurant.location,
//         openingTime: restaurant.openingTime,
//         closingTime: restaurant.closingTime,
//         deliveryCharge: restaurant.deliveryCharge,
//         vendor: {
//           connect: {
//             id: restaurant.vendorId,
//           },
//         },
//         menu: {
//           create: {
//             categories: {
//               create: [
//                 {
//                   name: 'Main Dishes',
//                   items: {
//                     create: [
//                       {
//                         name: `${restaurant.name} Special`,
//                         price: 150,
//                         restaurant: {
//                           connect: {
//                             id: restaurant.id,
//                           },
//                         },
//                         customizations: {
//                           create: [
//                             { name: 'Extra topping', price: 25 },
//                             { name: 'Large size', price: 30 },
//                           ],
//                         },
//                       },
//                       {
//                         name: "Chef's Choice",
//                         price: 120,
//                         restaurant: {
//                           connect: {
//                             id: restaurant.id,
//                           },
//                         },
//                         customizations: {
//                           create: [
//                             { name: 'Spicy', price: 10 },
//                             { name: 'Gluten-free', price: 20 },
//                           ],
//                         },
//                       },
//                     ],
//                   },
//                 },
//                 {
//                   name: 'Drinks',
//                   items: {
//                     create: [
//                       {
//                         name: 'Soda',
//                         price: 50,
//                         restaurant: {
//                           connect: {
//                             id: restaurant.id,
//                           },
//                         },
//                       },
//                       {
//                         name: 'Iced Tea',
//                         price: 90,
//                         restaurant: {
//                           connect: {
//                             id: restaurant.id,
//                           },
//                         },
//                       },
//                     ],
//                   },
//                 },
//               ],
//             },
//           },
//         },
//       },
//     });
//   }

//   console.log('Seed data added successfully.');
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });