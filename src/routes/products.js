const express = require('express')
const ProductManager = require('../dao/mongoDB/productManager')
const router = express.Router()


router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    }

    const products = await ProductManager.getProductsPaginated(options)

    res.json({
      status: 'success',
      payload: {
        products: products.docs,
        totalPages: products.totalPages,
        currentPage: products.page,
      },
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.post('/', async (req, res) => {
  try {
    let productsToAdd = req.body

    if (!Array.isArray(productsToAdd)) {
      productsToAdd = [productsToAdd]
    }

    const addedProducts = await Promise.all(productsToAdd.map(async (product) => {
      return await ProductManager.addProduct(product)
    }))

    res.json(addedProducts)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid, 10)
    const product = await ProductManager.getProductById(productId)

    if (product) {
      res.json(product)
    } else {
      return res.status(404).send('Product not found')
      
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
})



module.exports = router
