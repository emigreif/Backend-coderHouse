const ProductModel = require('../../models/productModel');

class ProductManager {
  async getProducts() {
    return await ProductModel.find()
  }

  async getProductById(id) {
    return await ProductModel.findById(id)
  }

  async addProduct(product) {
    return await ProductModel.create(product)
  }

  async updateProduct(id, updatedFields) {
    return await ProductModel.findByIdAndUpdate(id, updatedFields, { new: true })
  }

  async deleteProduct(id) {
    return await ProductModel.findByIdAndDelete(id)
  }
}

module.exports = ProductManager