const User = require("../model/User");
require("dotenv").config();

exports.update = async (req, res) => {
  try {
    const { email, ...updateData } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
