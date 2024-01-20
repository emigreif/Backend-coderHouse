const express = require('express')
const CartManager= require('../managers/cartManager') 


const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const newCart = req.body
    const addedCart = await CartManager.addCart(newCart)
    res.json(addedCart)
  } catch (error) {
    console.error('Error:', error)
  
  }
})

router.get('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid
    const cart = await CartManager.getCartById(cartId)

    if (cart) {
      res.json(cart)
    }
  } catch (error) {
    console.error('Error:', error)
 
  }
})

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid
    const productId = parseInt(req.params.pid, 10)
    const quantity = parseInt(req.body.quantity, 10)

    const updatedCart = await CartManager.addProductToCart(cartId, productId, quantity)
    res.json(updatedCart)
  } catch (error) {
    console.error('Error:', error)
}
})

module.exports = router
