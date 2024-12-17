const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const app = express();

// Debug Middleware: Logs all incoming requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Routes
const userRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");

app.use("/api/auth", userRoutes); // Auth routes
app.use("/api/movies", movieRoutes); // Movie routes

// Default Route
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// Error Handling for Undefined Routes
app.use((req, res) => {
  res.status(404).send("Route not found");
});

// Start the Server
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not set in .env
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
