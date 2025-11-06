import { PrismaClient } from '../../generated/prisma/index.js'

const prisma = new PrismaClient()

const products = [
    {
        name: 'Cotton T-Shirt',
        description: 'Comfortable white cotton t-shirt',
        price: 15.99,
        unit: 'piece',
        image: 'https://via.placeholder.com/150?text=T-Shirt'
    },
    {
        name: 'Blue Jeans',
        description: 'Classic blue denim jeans',
        price: 49.99,
        unit: 'piece',
        image: 'https://via.placeholder.com/150?text=Jeans'
    },
    {
        name: 'Running Shoes',
        description: 'Lightweight running shoes',
        price: 79.99,
        unit: 'pair',
        image: 'https://via.placeholder.com/150?text=Shoes'
    },
    {
        name: 'Leather Jacket',
        description: 'Stylish black leather jacket',
        price: 129.99,
        unit: 'piece',
        image: 'https://via.placeholder.com/150?text=Jacket'
    },
    {
        name: 'Wool Scarf',
        description: 'Warm wool scarf',
        price: 24.99,
        unit: 'piece',
        image: 'https://via.placeholder.com/150?text=Scarf'
    },
    {
        name: 'Sunglasses',
        description: 'UV protection sunglasses',
        price: 39.99,
        unit: 'piece',
        image: 'https://via.placeholder.com/150?text=Sunglasses'
    },
    {
        name: 'Baseball Cap',
        description: 'Adjustable baseball cap',
        price: 19.99,
        unit: 'piece',
        image: 'https://via.placeholder.com/150?text=Cap'
    },
    {
        name: 'Wrist Watch',
        description: 'Elegant wrist watch',
        price: 89.99,
        unit: 'piece',
        image: 'https://via.placeholder.com/150?text=Watch'
    }
]

const user = {
    fullName: 'Mock User',
    email: 'mock@example.com',
    password: 'hashedpassword' // In real app, hash it
}

async function main() {
    console.log('Seeding user and products...')

    const createdUser = await prisma.user.create({
        data: user
    })

    console.log('Created user:', createdUser.id)

    for (const product of products) {
        await prisma.product.create({
            data: product
        })
    }

    console.log('Seeded 8 fashion products successfully!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })