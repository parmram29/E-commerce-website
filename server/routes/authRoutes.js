const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Debug log to verify route registration
console.log("Auth routes loaded.");

router.post("/login", async (req, res) => {
  console.log("Login route hit"); // Confirms route is accessed

  const { username, password } = req.body;
  console.log("Request body received:", req.body); // Logs request body

  try {
    // Find the user in the database
    const user = await User.findOne({ username });
    console.log("User found in database:", user); // Log user object

    if (!user) {
      console.log("User not found in database");
      return res.status(404).json({ message: "Invalid username or password" });
    }

    // Compare the password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password valid:", isPasswordValid); // Log result of password comparison

    if (!isPasswordValid) {
      console.log("Password mismatch");
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, "secret_key", { expiresIn: "1h" });
    console.log("Token generated:", token); // Log token generation

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error); // Log unexpected errors
    res.status(500).json({ message: "An error occurred", error });
  }
});

// Export the router
module.exports = router;
