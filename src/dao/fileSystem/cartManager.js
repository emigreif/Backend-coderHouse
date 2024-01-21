const fs = require('fs').promises

class CartManager {

    async getCarts() {
        const data = await fs.readFile('carritos.json', 'utf-8')
        return JSON.parse(data)
    }

    async getCartById(id) {
        const carts = await this.getCarts()
        return carts.find((c) => c.id === id)
    }

    async addCart(cart) {
        const carts = await this.getCarts()
        const newCart = {
            id: this.generateCartId(),
            products: [],
            ...cart,
        }

        carts.push(newCart)
        await fs.writeFile('carritos.json', JSON.stringify(carts, null, 2), 'utf-8')

        return newCart
    }

    async addProductToCart(cartId, productId, quantity) {
        const carts = await this.getCarts()
        const cartIndex = carts.findIndex((c) => c.id === cartId)

        if (cartIndex !== -1) {
            const productIndex = carts[cartIndex].products.findIndex((p) => p.product === productId)

            if (productIndex !== -1) {
                carts[cartIndex].products[productIndex].quantity += quantity
            } else {
                carts[cartIndex].products.push({ product: productId, quantity })
            }

            await fs.writeFile('carritos.json', JSON.stringify(carts, null, 2), 'utf-8')
            return carts[cartIndex]
        } else {
            return null
        }
    }

    async generateCartId() {
        const carts = await getCarts()
        const lastCartId = carts.length > 0 ? carts[carts.length - 1].id : 0
        return lastCartId + 1
    }



}
module.exports = CartManager