import { PrismaClient, Prisma } from '../../generated/prisma/index.js'
import { asyncHandler } from "../middlewares/asyncHandler.js"

const prisma = new PrismaClient()

const getMockUserId = async () => {
    let user = await prisma.user.findUnique({
        where: { email: 'mock@example.com' }
    })
    if (!user) {
        user = await prisma.user.create({
            data: {
                fullName: 'Mock User',
                email: 'mock@example.com',
                password: 'hashedpassword'
            }
        })
    }
    return user.id
}

export const getCartItems = asyncHandler(
    async (req, res) => {
        const userId = await getMockUserId()
        const cart = await prisma.cart.findFirst({
            where: { userId },
            include: { items: true }
        })
        if (!cart) {
            return res.status(204).json({ items: [], total: 0 })
        }

        let total = 0
        const itemsWithDetails = []
        for (const item of cart.items) {
            const product = await prisma.product.findUnique({
                where: { id: item.productId }
            })
            if (product) {
                const itemTotal = product.price * item.quantity
                total += itemTotal
                itemsWithDetails.push({
                    productId: item.productId,
                    quantity: item.quantity,
                    name: product.name,
                    price: product.price,
                    unit: product.unit,
                    image: product.image,
                    total: itemTotal
                })
            }
        }

        res.status(200).json({ items: itemsWithDetails, total })
    }
)

export const addCartItems = asyncHandler(
    async (req, res) => {
        const { productId, quantity } = req.body
        const userId = await getMockUserId()

        if (!productId || !quantity || quantity <= 0) {
            return res.status(400).json({ message: "Invalid productId or quantity" })
        }

        try {
            await prisma.product.findFirstOrThrow({
                where: { id: productId }
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return res.status(400).json({ message: "Product not found" })
            }
            throw error
        }

        let cart = await prisma.cart.findFirst({
            where: { userId }
        })

        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    userId,
                    items: [{ productId, quantity }]
                }
            })
        } else {
            const itemIndex = cart.items.findIndex(
                (item) => item.productId === productId
            )
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity
            } else {
                cart.items.push({ productId, quantity })
            }
            await prisma.cart.update({
                where: { id: cart.id },
                data: { items: cart.items }
            })
        }

        res.status(201).json({ message: "Item added to cart", cart })
    }
)

export const deleteCartItems = asyncHandler(
    async (req, res) => {
        const { id: productId } = req.params
        const userId = await getMockUserId()

        const cart = await prisma.cart.findFirst({
            where: { userId }
        })

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" })
        }

        const itemExists = cart.items.find(
            (item) => item.productId === productId
        )

        if (!itemExists) {
            return res.status(404).json({ message: "Item not found in cart" })
        }

        const updatedItems = cart.items.filter(
            (item) => item.productId !== productId
        )

        await prisma.cart.update({
            where: { id: cart.id },
            data: { items: updatedItems }
        })

        res.status(200).json({ message: "Item removed from cart" })
    }
)

export const checkout = asyncHandler(
    async (req, res) => {
        const { cartItems } = req.body
        const userId = await getMockUserId()

        if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
            return res.status(400).json({ message: "Invalid or empty cart items" })
        }

        let totalAmount = 0
        const orderItems = []
        const invalidProducts = []

        for (const item of cartItems) {
            if (!item.productId || !item.quantity || item.quantity <= 0) {
                return res.status(400).json({ message: "Invalid item in cart" })
            }

            try {
                const product = await prisma.product.findUnique({
                    where: { id: item.productId }
                })

                if (!product) {
                    invalidProducts.push(item.productId)
                } else {
                    const itemTotal = product.price * item.quantity
                    totalAmount += itemTotal
                    orderItems.push({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: product.price,
                        name: product.name,
                        unit: product.unit
                    })
                }
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    invalidProducts.push(item.productId)
                } else {
                    throw error
                }
            }
        }

        if (invalidProducts.length > 0) {
            return res.status(400).json({
                message: "Some products not found or invalid",
                invalidProducts
            })
        }

        if (orderItems.length === 0) {
            return res.status(400).json({ message: "No valid items to checkout" })
        }

        const order = await prisma.order.create({
            data: {
                userId,
                items: orderItems,
                totalAmount
            }
        })

        await prisma.cart.updateMany({
            where: { userId },
            data: { items: [] }
        })

        res.status(200).json({
            message: "Checkout successful",
            receipt: {
                orderId: order.id,
                total: totalAmount,
                timestamp: order.createdAt,
                items: orderItems
            }
        })
    }
)
