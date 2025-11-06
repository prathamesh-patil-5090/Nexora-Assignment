const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const api = {
    async getProducts(page = 1, limit = 10) {
        const response = await fetch(`${API_BASE_URL}/api/products?page=${page}&limit=${limit}`)
        if (!response.ok) throw new Error('Failed to fetch products')
        return response.json()
    },

    async getCart() {
        const response = await fetch(`${API_BASE_URL}/api/cart`)
        if (!response.ok) throw new Error('Failed to fetch cart')
        return response.json()
    },

    async addToCart(productId, quantity) {
        const response = await fetch(`${API_BASE_URL}/api/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, quantity }),
        })
        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || 'Failed to add to cart')
        }
        return response.json()
    },

    async removeFromCart(productId) {
        const response = await fetch(`${API_BASE_URL}/api/cart/${productId}`, {
            method: 'DELETE',
        })
        if (!response.ok) throw new Error('Failed to remove from cart')
        return response.json()
    },

    async checkout(cartItems) {
        const response = await fetch(`${API_BASE_URL}/api/cart/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cartItems }),
        })
        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || 'Checkout failed')
        }
        return response.json()
    },
}
