const ProductModel = require('../../models/productModel')
const mongoosePaginate = require('mongoose-paginate-v2')


class ProductManager {
  async getProducts() {
    return ProductModel.find()
  }

  async getProductsPaginated(page = 1, limit = 10, sort = null, query = null) {
    const options = {
      page,
      limit,
      sort,
    }

    if (query) {
      options.customLabels = {
        totalDocs: 'totalProducts',
        docs: 'products',
      }

      return ProductModel.paginate(query, options)
    }

    return ProductModel.paginate({}, options)
  }

  async getProductById(id) {
    return ProductModel.findOne({ id: id })
  }

  async addProduct(product) {
    const newProduct = new ProductModel({
      id: !isNaN(product.id) ? product.id : await this.generateProductId(),
      ...product,
    })
  
    await newProduct.save()
    return newProduct.toObject()
  }

  async updateProduct(id, updatedFields) {
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { id: id },
      { $set: updatedFields },
      { new: true }
    )

    return updatedProduct ? updatedProduct.toObject() : null
  }

  async deleteProduct(id) {
    const deletedProduct = await ProductModel.findOneAndDelete({ id: id })
    return deletedProduct ? deletedProduct.toObject() : null
  }

  async generateProductId() {
    const lastProduct = await ProductModel.findOne().sort({ id: -1 })
    return lastProduct ? lastProduct.id + 1 : 1
  }
}

module.exports = new ProductManager()
