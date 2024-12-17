const mongoose = require("mongoose");


// Define the schema for the movies collection
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Movie title
  year: { type: Number },                  // Release year
  plot: { type: String },                  // Short description
  genres: [String],                        // Array of genres
  runtime: { type: Number },               // Movie runtime in minutes
  cast: [String],                          // Array of cast members
  poster: { type: String },                // Poster image URL
  fullplot: { type: String },              // Full description
  languages: [String],                     // Array of languages
  released: { type: Date },                // Release date
  directors: [String],                     // Array of directors
  rated: { type: String },                 // Movie rating (e.g., PG, G, etc.)
  awards: {                                // Awards object
    wins: { type: Number },
    nominations: { type: Number },
    text: { type: String },
  },
  imdb: {                                  // IMDb object
    rating: { type: Number },
    votes: { type: Number },
    id: { type: Number },
  },
  countries: [String],                     // Array of production countries
  type: { type: String },                  // Type of entry (e.g., "movie")
  tomatoes: {                              // Rotten Tomatoes object
    viewer: {
      rating: { type: Number },
      numReviews: { type: Number },
    },
    lastUpdated: { type: Date },
  },
});

module.exports = mongoose.model("Movie", movieSchema, "movies"); // Use the existing "movies" collection

