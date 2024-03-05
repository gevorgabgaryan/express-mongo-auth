import ProductService from '../services/ProductService'

class ProductController {
  static async all (req, res) {
    const { page, itemsPerPage, keyword } = req.query
    try {
      if (typeof keyword !== 'string') {
            throw new Error('Invalid keyword')
      }
      const safeKeyword = keyword ? keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') : '';
      const result = await ProductService.getProducts(
        page,
        itemsPerPage,
        safeKeyword
      )
      res.status(200).json({
        status: true,
        result
      })
    } catch (e) {
      console.log(e)
      res.status(400).json({
        status: false,
        error: true,
        message: 'System error'
       })
      }
  }

  static async totalDiscount (req, res) {
    try {
      const result = await ProductService.totalDiscount();
      res.status(200).json({
        status: true,
        result
      })
    } catch (e) {
      console.log(e)
      res.status(400).json({
        status: false,
        error: true,
        message: 'System error'
       })
      }
  }

}

export default ProductController