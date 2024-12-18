const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // load environment variables from .env file

const app = express();

// debug middleware, logs all incoming requests to help debugging
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// middleware
app.use(express.json()); // parse incoming JSON requests
app.use(cors()); // enable Cross-Origin Resource Sharing

// mongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB")) //verifying login whether successful or not
  .catch((err) => console.error("Could not connect to MongoDB:", err)); //log the errors

//routes
const userRoutes = require("./routes/authRoutes"); //user auth routes
const movieRoutes = require("./routes/movieRoutes"); //movie routes

app.use("/api/auth", userRoutes); // ALL auth routes
app.use("/api/movies", movieRoutes); // ALL movie routes

// default route
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// error handling for undefined routes
app.use((req, res) => {
  res.status(404).send("Route not found");
});

// start the Server
const PORT = process.env.PORT || 5000; // default to 5000 if port is not set in .env
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); //login SERVER startup message
});
