import { Schema, model } from 'mongoose'

const productSchema = Schema({
  sku: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number, required: true, default: 0 },
  count: { type: Number },
  countՕfSold: { type: Number },
  isVisible: { type: Boolean, default: false },
  userId: {
    type: Schema.Types.ObjectId, // Reference to User model
    ref: 'User',
    required: true
  },
  isSold: {
    type: Boolean,
    default: false
  }
})

productSchema.methods.entitize = function () {
  const args = Array.from(arguments)
  const res = this.toObject({ virtuals: true })
  delete res.__v
  res.id = res._id
  delete res._id
  for (const item of args) {
    delete res[item]
  }
  return res
}

productSchema.statics.findBySku = function (sku) {
  return this.findOne({ sku })
}

productSchema.statics.findExpensiveProducts = function () {
  return this.find({ price: { $gte: 100 } })
}

productSchema.methods.calculateDiscountedPrice = function () {
  const discountedPrice = this.price - (this.price * this.discountPercentage) / 100
  return discountedPrice
}

productSchema.statics.calculateTotalDiscountSum = function () {
  const query = {
     isVisible: true
  }
  return this.aggregate([
    {
        $match: query
    },
    {
      $group: {
        _id: null,
        totalDiscountSum: {
          $sum: {
            $cond: {
              if: { $gte: ['$price', 10] },
              then: {
                $multiply: [
                  { $divide: ['$discountPercentage', 100] },
                  { $multiply: ['$price', '$countՕfSold'] }
                ]
              },
              else: 0
            }
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        totalDiscountSum: 1
      }
    }
  ])
}

const ProductModel = model('Product', productSchema)

export default ProductModel