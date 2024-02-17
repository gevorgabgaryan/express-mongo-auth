import {
  registerBodySchema,
  loginBodySchema
} from '../validators/authValidatorSchemas.js'
import {
  getProductsQuerySchema
} from '../validators/productValidatorSchemas.js'



import { validationHandler } from '../utils/'

export const validateRegisterData = (req, res, next) => {
  validationHandler(req, res, next, registerBodySchema)
}

export const validateLoginData = (req, res, next) => {
  validationHandler(req, res, next, loginBodySchema)
}

export const validateGetProducts = (req, res, next) => {
  validationHandler(req, res, next, null, getProductsQuerySchema, null)
}