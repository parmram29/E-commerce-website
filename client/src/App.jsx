import React, { useState, useEffect } from "react";
import Login from "./components/Login"; // import the Login component
import axios from "axios";

const App = () => {
  const [token, setToken] = useState(""); // store the token from login
  const [movies, setMovies] = useState([]); // store the movies fetched from the backend

  // load token from localStorage when the app starts
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // debug log to check when movies state is updated
  useEffect(() => {
    console.log("Movies state updated:", movies);
  }, [movies]);

  //feetch movies from the backend
  const fetchMovies = async () => {
    try {
      console.log("Fetching movies..."); // debug log
      const response = await axios.get("http://localhost:5001/api/movies", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched movies data:", response.data); // debug log
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
      alert("Failed to fetch movies. Check the console for details.");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // clear the token from localStorage
    setToken(""); // reset the token state
  };

  // render login
  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div
      className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white min-h-screen p-6"
    >
      <h1 className="text-4xl font-bold mb-6 text-center">Movie Database</h1>

      {/* Fetch and Logout Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={fetchMovies}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Fetch Movies
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Movies List */}
      {movies.length === 0 ? (
        <p className="text-center text-gray-400">No movies to display. Please check your API or database connection.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="border border-gray-700 p-4 rounded-lg bg-gray-800 shadow-lg"
            >
              <h2 className="text-2xl font-semibold mb-2 text-yellow-400">
                {movie.title}
              </h2>
              <p className="text-sm text-gray-400 mb-2">Year: {movie.year}</p>
              <p className="text-sm text-gray-400 mb-4">
                Genres: {movie.genres.join(", ")}
              </p>
              <p className="text-sm italic mb-4">{movie.plot}</p>
              {movie.poster && (
                <img
                  src={movie.poster}
                  alt={`${movie.title} Poster`}
                  loading="lazy"
                  className="w-full h-auto rounded"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <footer className="text-center text-gray-500 mt-8">
        &copy; 2024 Movie Database. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
