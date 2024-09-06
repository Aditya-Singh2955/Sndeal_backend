const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  productname:{
    type:String,
    required:true
  },
  productdescription: {
    type: String,
    required: true,
  },
  productprice:{
    type:Number,
    required:true
  },
  productimageUrl:{
    type:String,
    required:true
  }
});

const Orders = mongoose.model("Orders", OrderSchema);

module.exports = Orders;
