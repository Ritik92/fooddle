const prisma = require("./prisma");

async function handle() {
    await prisma.restaurant.createMany({
        data: [
            { id: 1, image: '/pizzaNation.png', name: 'Pizza Nation', Closingtime: '12:00 pm', address: 'cos' },
            { id: 2, image: '/restpic.png', name: 'Desert Club', Closingtime: '12:00 pm', address: 'cos' },
            { id: 3, image: '/restpic2.png', name: 'Sips N Bites', Closingtime: '12:00 pm', address: 'G-block' },
            { id: 4, image: '/restpic2.png', name: 'Sips N Bites', Closingtime: '12:00 pm', address: 'G-block' },
        ]
    });
}

handle().catch(e => console.error(e)).finally(() => prisma.$disconnect());
