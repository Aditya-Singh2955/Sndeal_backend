const mongoose = require('mongoose');

const watchSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
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
    default: 'Watch',
  },
  rating: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  isAnalog: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,
    required:true,
  }
});

const Watch = mongoose.model('Watch', watchSchema);

module.exports = Watch;
