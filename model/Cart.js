const mongoose = require('mongoose');

// Schema for individual cart items
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: String, // Matches your database type
    required: true,
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
  rating: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

// Schema for the cart
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // References the unique _id from the user collection
    required: true,
    ref: 'User',
  },
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  useraddress: {
    type: String,
    required: true,
  },
  userphone: {
    type: String,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  items: [cartItemSchema], // Array of cart items
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
