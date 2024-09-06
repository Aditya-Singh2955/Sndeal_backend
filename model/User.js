const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Guest", "Visitor"],
  },
  phone:{
    type:String,
    required:true
  },
  address:{
    type:String,
    required:true
  },
  resetToken:{
    type:String,
  },
  resetTokenExpire:{
    type:Date
  }

});

module.exports = mongoose.model("User", userSchema);
