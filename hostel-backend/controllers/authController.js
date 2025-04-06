// controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Payment = require("../models/Payment");
const Admin = require("../models/Admin");

exports.registerUser = async (req, res) => {
  try {
    // Destructure new fields from request body
    const { rollNumber, username, email, password } = req.body;

    // 1. Check if user already exists based on email (you could also check rollNumber if needed)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 3. Create new user with rollNumber, username, email, and hashed password
    const newUser = new User({
      rollNumber,
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // 4. Create a Payment document for the new user with an initial outstanding fee
    const newPaymentDoc = new Payment({
      user: newUser._id,
      outstandingFee: 5000, // For example, 5,000 INR outstanding initially
    });
    await newPaymentDoc.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 2. Compare provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3. Generate JWT including additional user info
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return both the token and user details so the client can easily display the username
    return res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.registerAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if an admin with the same email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the admin user
    const admin = await Admin.create({
      username,
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "Admin registered successfully", adminId: admin._id });
  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).json({ message: "Server error while registering admin" });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    // Compare provided password with stored hash
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Create JWT (adjust secret and expiration as needed)
    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({ token });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
