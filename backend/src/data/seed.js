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
        image: 'https://www.tenuejeans.com/cdn/shop/files/JACKSONRENO_0051.jpg?v=1746526707&width=1024'
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
        image: 'https://www.vishalmegamart.com/dw/image/v2/BGHT_PRD/on/demandware.static/-/Sites-vmm-gm-master-catalog/default/dweea60666/images/large/1240021310.jpg?sw=900&sh=900'
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
        image: 'https://neweracap.in/cdn/shop/files/60759071_2.jpg?v=1755870381&width=1920'
    },
    {
        name: 'Wrist Watch',
        description: 'Elegant wrist watch',
        price: 89.99,
        unit: 'piece',
        image: 'https://sc04.alicdn.com/kf/H2ffac781db5a45fd898a81dc687da440O.jpg'
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