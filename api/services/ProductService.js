import ProductModel from '../models/ProductModel'

class ProductService {
  static async getProducts (page, itemPerPage, keyword) {
    const query = {
      isVisible: true
    }

    if (keyword) {
      const regex = new RegExp(keyword, 'i')
      query.$or = [
        { name: { $regex: regex } },
        { sku: { $regex: regex } }
      ]
    }

    const products = await ProductModel.find(query)
      .populate('userId')
      .skip((page - 1) * itemPerPage)
      .limit(itemPerPage)

    const totalProductsCount = await ProductModel.countDocuments(query)

    return {
      products: products.map(p=>p.entitize('isVisible', 'countՕfSold')),
      totalProductsCount
    }
  }


  static async totalDiscount () {
    return await ProductModel.calculateTotalDiscountSum()
  }

  static async getProduct (id) {
    return await ProductModel.findOne({ _id: id })
  }

}

export default ProductService
