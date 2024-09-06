const User = require("../model/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();
const bcrypt = require("bcrypt");

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({ resetToken: hashedToken, resetTokenExpire: { $gt: Date.now() } });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }
    let hashedPassword= await bcrypt.hash(newPassword,10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
