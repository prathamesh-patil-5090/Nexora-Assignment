import { PrismaClient } from '../../generated/prisma/index.js'

const prisma = new PrismaClient()

export const getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const skip = (page - 1) * limit
        const totalProducts = await prisma.product.count()
        const products = await prisma.product.findMany({
            skip,
            take: limit,
        })
        const totalPages = Math.ceil(totalProducts / limit)
        return res.status(200).json({ page, limit, totalProducts, totalPages, products })
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' })
    }
}