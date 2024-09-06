const Cart = require("../model/Cart");
const User = require("../model/User");
const mongoose = require("mongoose");

exports.addToOrder = async (req, res) => {
  try {
    const { userId, productId, name, description, price, rating, imageUrl } = req.body;

    console.log("Received:", req.body); // Log the received body

    // Validate input
    if (!userId || !productId || !name || !description || !price || !rating || !imageUrl) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    // Fetch user details using the unique _id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the user's cart by the unique _id
    let cart = await Cart.findOne({ userId: user._id });

    if (cart) {
      // Cart exists, check if the product is already in the cart
      const itemIndex = cart.items.findIndex(item => item.productId === productId);

      if (itemIndex > -1) {
        // Product exists in the cart, increase the quantity
        cart.items[itemIndex].quantity += 1;
      } else {
        // Product does not exist in the cart, add it
        cart.items.push({
          productId,
          name,
          description,
          price,
          rating,
          imageUrl,
          quantity: 1, // Start with quantity 1
        });
      }
    } else {
      // Cart does not exist, create a new cart
      cart = new Cart({
        userId: user._id,
        userName: user.name,
        userEmail: user.email,
        useraddress: user.address,
        userphone: user.phone,
        items: [{
          productId,
          name,
          description,
          price,
          rating,
          imageUrl,
          quantity: 1, // Start with quantity 1
        }],
      });
    }

    // Save the cart
    await cart.save();
    return res.status(200).json({ message: "Item added to cart successfully", cart });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};
