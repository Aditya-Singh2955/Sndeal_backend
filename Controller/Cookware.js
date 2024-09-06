const Cookware = require("../model/Cookware");
require("dotenv").config();

exports.createCookware = async (req, res) => {
    try {
        const products = req.body; // Expecting an array of products
    
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid input: Expected an array of products.",
            });
        }
    
        const productIds = products.map(p => p.productId);
        const existingProducts = await Cookware.find({ productId: { $in: productIds } }).select('productId');
        
        const existingProductIdSet = new Set(existingProducts.map(p => p.productId));
        const newProducts = products.filter(p => !existingProductIdSet.has(p.productId));
    
        if (newProducts.length > 0) {
            try {
                await Cookware.insertMany(newProducts);
            } catch (dbError) {
                console.error("Error During Insertion:", dbError);
                return res.status(500).json({
                    success: false,
                    message: "Error inserting products into the database.",
                    error: dbError.message, // Include the error message for debugging
                });
            }
        }
    
        return res.status(200).json({
            success: true,
            message: "Products added successfully",
            addedCount: newProducts.length,
        });
    } catch (error) {
        console.error("Error During Bulk Adding Products:", error);
        return res.status(500).json({
            success: false,
            message: "Products cannot be added successfully",
            error: error.message, // Include the error message for debugging
        });
    }
};
