const User = require("../model/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Configure your email transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // or another email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Endpoint to request a password reset
exports.password = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email format
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a password reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    
    // Hash the token before saving to the database
    user.resetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetTokenExpire = Date.now() + 3600000; // 1 hour

    await user.save();

    // Create the reset URL
    const resetURL = `http://localhost:3000/reset-password?token=${resetToken}`;

    // Send the reset email
    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Click the link to reset your password: ${resetURL}`
    };

    // Debugging: Log the mailOptions
    console.log('Sending email with options:', mailOptions);

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};