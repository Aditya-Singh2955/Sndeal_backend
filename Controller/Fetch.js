const User = require("../model/User");
require("dotenv").config();

exports.getUserDetails = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      user: {
        name: user.name,
        address: user.address,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("Error during fetching user details:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching user details",
    });
  }
};
