const ProductModel = require('../../models/productModel')
class ProductManager {
  async getProducts() {
    return ProductModel.find()
  }

  async getProductById(id) {
    return ProductModel.findOne({ id: id })
  }

  async addProduct(product) {
    const newProduct = new ProductModel({
      id: await this.generateProductId(),
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

module.exports = ProductManager