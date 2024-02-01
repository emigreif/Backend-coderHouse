const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],

})

const CartModel = mongoose.model('Cart', cartSchema)

module.exports = CartModel