const express = require('express')
const CartManager = require('../dao/mongoDB/cartManager')


const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const carts = await CartManager.getCarts().populate('products.product')
    res.json(carts)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json( 'NO HAY CARRITOS')
  }
})

router.post('/', async (req, res) => {
  try {
    const newCart = req.body
    const addedCart = await CartManager.addCart(newCart)
    res.json(addedCart)
  } catch (error) {
    console.error('Error:no se pudo', error)

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
    console.error('Error:no encontrad', error)

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
router.put('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid
    const updatedFields = req.body

    const updatedCart = await CartManager.updateCart(cartId, updatedFields)
    res.json(updatedCart)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.delete('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid
    const deletedCart = await CartManager.deleteCart(cartId)

    if (deletedCart) {
      res.json(deletedCart)
    } else {
      res.status(404).json({ error: 'Cart not found' })
    }
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = router
