const express = require("express");
const Movie = require("../models/Movie");

const router = express.Router();

// Example route: Get all movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});

// Export the router
module.exports = router;
