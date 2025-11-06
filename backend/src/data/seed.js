import { PrismaClient } from '../../generated/prisma/index.js'

const prisma = new PrismaClient()

const products = [
    {
        name: 'Cotton T-Shirt',
        description: 'Comfortable white cotton t-shirt',
        price: 15.99,
        unit: 'piece',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&fit=crop'
    },
    {
        name: 'Blue Jeans',
        description: 'Classic blue denim jeans',
        price: 49.99,
        unit: 'piece',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&fit=crop'
    },
    {
        name: 'Running Shoes',
        description: 'Lightweight running shoes',
        price: 79.99,
        unit: 'pair',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&fit=crop'
    },
    {
        name: 'Leather Jacket',
        description: 'Stylish black leather jacket',
        price: 129.99,
        unit: 'piece',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&fit=crop'
    },
    {
        name: 'Wool Scarf',
        description: 'Warm wool scarf',
        price: 24.99,
        unit: 'piece',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&fit=crop'
    },
    {
        name: 'Sunglasses',
        description: 'UV protection sunglasses',
        price: 39.99,
        unit: 'piece',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&fit=crop'
    },
    {
        name: 'Baseball Cap',
        description: 'Adjustable baseball cap',
        price: 19.99,
        unit: 'piece',
        image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&fit=crop'
    },
    {
        name: 'Wrist Watch',
        description: 'Elegant wrist watch',
        price: 89.99,
        unit: 'piece',
        image: 'https://images.unsplash.com/photo-1524592094714-0f25c5027c3c?w=400&fit=crop'
    }
]

const user = {
    fullName: 'Mock User',
    email: 'mock@example.com',
    password: 'hashedpassword'
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