const bcrypt = require("bcrypt");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();


// Signup route
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role, phone, address, lastname } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Secure password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      console.error("Error in hashing password:", err.message);
      return res.status(500).json({
        success: false,
        message: "Error in hashing password",
      });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      address,
      lastname,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        password: user.password,
        phone: user.phone,
        address: user.address,
        lastname: user.lastname,
      },
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered",
    });
  }
};



exports.login = async (req, res) => {
  try {
    // Data fetch
    const { email, password } = req.body;

    // Validation on email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill the data carefully",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered",
      });
    }

    // Verify password & generate JWT token
    if (await bcrypt.compare(password, user.password)) {
      // Password match
      const payload = {
        email: user.email,
        id: user._id,
        role: user.role,
      };

      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User logged in successfully",
      });
    } else {
      // Password incorrect
      return res.status(403).json({
        success: false,
        message: "Password incorrect",
      });
    }
  } catch (error) {
    console.error('Login error:', error.message);
    return res.status(500).json({
      success: false,
      message: "Login failure",
    });
  }
};

