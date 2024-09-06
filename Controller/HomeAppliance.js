const HomeAppliance = require("../model/HomeAppliances");
require("dotenv").config();

// Create a new home appliance
exports.createHomeAppliances = async (req, res) => {
  try {
    const {
      name,
      productId,
      description,
      price,
      category,
      rating,
      brand,
      imageUrl
    } = req.body;

    // Check if the product already exists
    const existingProduct = await HomeAppliance.findOne({ productId });

    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Item already exists",
      });
    }

    const newHomeAppliances = await HomeAppliance.create({
      name,
      productId,
      description,
      price,
      category,
      rating,
      brand,
      imageUrl
    });

    return res.status(200).json({
      success: true,
      message: "Product added successfully",
      appliance: {
        name: newHomeAppliances.name,
        productId: newHomeAppliances.productId,
        description: newHomeAppliances.description,
        price: newHomeAppliances.price,
        category: newHomeAppliances.category,
        rating: newHomeAppliances.rating,
        brand: newHomeAppliances.brand,
        createdAt: newHomeAppliances.createdAt,
        imageUrl: newHomeAppliances.imageUrl
      },
    });
  } catch (error) {
    console.log("Error During Adding Product", error);
    return res.status(500).json({
      success: false,
      message: "Item cannot be added successfully",
    });
  }
};

exports.getHomeAppliances = async (req, res) => {
    try {
      const { category } = req.body;
  
      // Filter based on the category if it's provided
      const query = category ? { category } : {};
  
      const HomeAppliances = await HomeAppliance.find(query);
      res.status(200).json(HomeAppliances);
    } catch (error) {
      console.log("Error in fetching", error);
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };
  