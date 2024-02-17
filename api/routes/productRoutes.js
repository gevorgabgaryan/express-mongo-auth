import { Router } from 'express'
import {
  validateGetProducts,
} from '../middlewares/validation'
import ProductController from '../controllers/ProductController'

const productRoutes = Router()

productRoutes.get('/', validateGetProducts, ProductController.all)

productRoutes.get(
  '/total-discount',
  ProductController.totalDiscount
)

export default productRoutes