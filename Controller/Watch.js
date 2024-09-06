const Watch = require("../model/Watch");
require("dotenv").config();

// Create a new watch
exports.createWatch = async (req, res) => {
  try {
    const {
      name,
      productId,
      description,
      price,
      category,
      rating,
      brand,
      isAnalog,
      createdAt,
      imageUrl
    } = req.body;

    // Check if the product already exists
    const existingProduct = await Watch.findOne({ productId });

    if (existingProduct) {
      return res.status(400).json({
        success: false, // corrected spelling
        message: "Item already exists",
      });
    }

    const newWatch = await Watch.create({
      name,
      productId,
      description,
      price,
      category,
      rating,
      brand,
      isAnalog,
      createdAt,
      imageUrl
    });

    return res.status(200).json({
      success: true,
      message: "Product added successfully",
      watch: {
        name: newWatch.name,
        productId: newWatch.productId,
        description: newWatch.description,
        price: newWatch.price,
        category: newWatch.category,
        rating: newWatch.rating,
        brand: newWatch.brand,
        isAnalog: newWatch.isAnalog,
        createdAt: newWatch.createdAt,
        imageUrl:newWatch.imageUrl
      },
    });
  } catch (error) {
    console.log("Error During Adding Product", error);
    return res.status(500).json({
      success: false, // corrected spelling
      message: "Item cannot be added successfully",
    });
  }
};

exports.updateWatch = async (req, res) => {
  try {
    const { productId, ...updateData } = req.body;

    // Use findOneAndUpdate if productId is a custom field
    const updatedProduct = await Watch.findOneAndUpdate(
      { productId: productId },
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error Updating Product Data:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
exports.getwatch = async (req, res) => {
  try {
    const isAnalog = req.query.isAnalog === 'true';
    const watches = await Watch.find({ isAnalog });
    res.status(200).json(watches);
  } catch (error) {
    console.log("Error in fetching", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};