const fs = require('fs').promises

class ProductManager {

    async getProducts() {
        const data = await fs.readFile('productos.json', 'utf-8')
        return JSON.parse(data)
    }

    async getProductById(id) {
        const products = await this.getProducts()
        return products.find((p) => p.id === id)
    }

    async addProduct(product) {
        const products = await this.getProducts()
        const newProduct = {
            id: this.generateProductId(),
            ...product,
        }

        products.push(newProduct)
        await fs.writeFile('productos.json', JSON.stringify(products, null, 2), 'utf-8')

        return newProduct
    }

    async updateProduct(id, updatedFields) {
        const products = await this.getProducts()
        const index = products.findIndex((p) => p.id === id)

        if (index !== -1) {
            products[index] = { ...products[index], ...updatedFields }
            await fs.writeFile('productos.json', JSON.stringify(products, null, 2), 'utf-8')
            return products[index]
        } else {
            return null
        }
    }

    async deleteProduct(id) {
        const products = await this.getProducts()
        const index = products.findIndex((p) => p.id === id)

        if (index !== -1) {
            const deletedProduct = products.splice(index, 1)[0]
            await fs.writeFile('productos.json', JSON.stringify(products, null, 2), 'utf-8')
            return deletedProduct
        } else {
            return null
        }
    }

    async generateProductId() {
        const products = await getProducts()
        const lastProductId = products.length > 0 ? products[products.length - 1].id : 0
        return lastProductId + 1
    }

}
module.exports = ProductManager