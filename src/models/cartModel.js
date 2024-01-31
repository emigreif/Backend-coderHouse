const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  products: [
    {
    },
  ],
})

const CartModel = mongoose.model('Cart', cartSchema)

module.exports = CartModel
