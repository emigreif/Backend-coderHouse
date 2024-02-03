const CartModel = require('../../models/cartModel')
class CartManager {
  async getCarts() {
    return CartModel.find().populate('products.product')
  }

  async getCartById(id) {
    return CartModel.findOne({ id: id }).populate('products.product')
  }

  async addCart(cart) {
    const newCart = new CartModel({
      id: await this.generateCartId(),
      products: [],
      ...cart,
    })

    await newCart.save()
    return newCart.toObject()
  }

  async addProductToCart(cartId, productId, quantity) {
    const cart = await CartModel.findOne({ id: cartId })

    if (cart) {
      const productIndex = cart.products.findIndex((p) => p.product.equals(productId))

      if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity
      } else {
        cart.products.push({ product: productId, quantity })
      }

      await cart.save()
      return cart.toObject()
    } else {
      return null
    }
  }

  async generateCartId() {
    const lastCart = await CartModel.findOne().sort({ id: -1 })
    return lastCart ? lastCart.id + 1 : 1
  }
}

module.exports = new CartManager()