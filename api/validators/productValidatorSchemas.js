import Joi from 'joi'

export const getProductsQuerySchema = Joi.object({
  page: Joi.number().required(),
  itemsPerPage: Joi.number().required().max(100),
  keyword: Joi.string().max(100)
})