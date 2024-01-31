const CartModel = require('../../models/cartModel')

class CartManager {
  async getCarts() {
    return await CartModel.find()
  }

  async getCartById(id) {
    return await CartModel.findById(id)
  }

  async addCart(cart) {
    return await CartModel.create(cart)
  }

  async addProductToCart(cartId, productId, quantity) {
    const cart = await CartModel.findById(cartId)

    if (cart) {
      const productIndex = cart.products.findIndex((p) => p.product === productId)

      if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity
      } else {
        cart.products.push({ product: productId, quantity })
      }

      return await cart.save()
    } else {
      return null
    }
  }
}

module.exports = CartManager
