const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'A Product must have a name'],
      trim: true,
      maxlength: [50, 'A product name should contain max 50 characters'],
      minlength: [2, 'A product name must be more than 1 character long'],
    },
    company: {
      type: String,
      enum: ['ikea', 'liddy', 'caressa', 'marcos'],
      message: '{VALUE} is not supported',
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'A Product must have a price'],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)
const Product = mongoose.model('product', ProductSchema)

module.exports = Product
