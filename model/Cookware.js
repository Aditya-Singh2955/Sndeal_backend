const mongoose = require('mongoose');

const cookwareSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,
    required:true,
  },
  sno:{
    type:Number,
    required:true,
  },
  mrp:{
    type:Number,
    required:true,
  },
  discountprice:{
    type:Number,
    required:true
  },
  percentage:{
    type:Number,
    required:true
  }
});

const cookware = mongoose.model('Cookware', cookwareSchema);

module.exports = cookware;
