const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// debug log to verify route registration
console.log("Auth routes loaded.");

// login route
router.post("/login", async (req, res) => {
  console.log("Login route hit"); // confirms route is accessed

  const { username, password } = req.body;
  console.log("Request body received:", req.body); // logs request body

  try {
    // find the user in the database
    const user = await User.findOne({ username });
    console.log("User found in database:", user); // log user object

    if (!user) {
      console.log("User not found in database");
      return res.status(404).json({
        message: "No account exists with that username. Please sign up or try again.",
      });
    }

    // compare the password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password valid:", isPasswordValid); // log result of password comparison

    if (!isPasswordValid) {
      console.log("Password mismatch");
      return res.status(401).json({
        message: "Incorrect password. Please try again.",
      });
    }

    // JWT token
    const token = jwt.sign({ id: user._id }, "secret_key", { expiresIn: "1h" });
    console.log("Token generated:", token); // log token generation

    res.status(200).json({
      message: "Login successful!",
      token,
    });
  } catch (error) {
    console.error("Error during login:", error); // log unexpected errors
    res.status(500).json({
      message: "An error occurred while logging in. Please try again later.",
    });
  }
});

// export the router
module.exports = router;
