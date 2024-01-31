const express = require('express')
const ProductManager = require('../dao/mongoDB/productManager')
const router = express.Router()


router.get('/', async (req, res) => {
    try {
        res.send('estas en products')
        const limit = parseInt(req.query.limit, 10)
        const products = await ProductManager.getProducts()

        if (!isNaN(limit)) {
            res.json(products.slice(0, limit))
        } else {
            res.json(products)
        }
    } catch (error) {
        console.error('Error:', error)
    }
})

router.post('/', async (req, res) => {
    try {
        const newProduct = req.body
        const addedProduct = await ProductManager.addProduct(newProduct)
        res.json(addedProduct)
    } catch (error) {
        console.error('Error:', error)
    }
})
router.get('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid, 10)
        const product = await ProductManager.getProductById(productId)

        if (product) {
            res.json(product)
        } else {
        }
    } catch (error) {
        console.error('Error:', error)
    }
})

router.put('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid, 10)
        const updatedProduct = req.body
        const product = await ProductManager.updateProduct(productId, updatedProduct)

        if (product) {
        }
    } catch (error) {
        console.error('Error:', error)
    }
})

router.delete('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid, 10)
        const deletedProduct = await ProductManager.deleteProduct(productId)
        if (deletedProduct) {
            res.json(deletedProduct)
        }
    } catch (error) {
        console.error('Error:', error)
    }
})
router.get('/realtimeproducts', async (req, res) => {
    try {
      const products = await ProductManager.getProducts()
      res.render('realTimeProducts', { products })
    } catch (error) {
      console.error('Error:', error)
     }
  });


  
module.exports = router
