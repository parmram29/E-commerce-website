import React, { useState, useEffect } from "react";
import Login from "./components/Login"; // import the Login component
import axios from "axios";

const App = () => {
  const [token, setToken] = useState(""); // store the token from login
  const [movies, setMovies] = useState([]); // store the movies fetched from the backend

  // Load token from localStorage when the app starts
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Debug log to check when movies state is updated
  useEffect(() => {
    console.log("Movies state updated:", movies);
  }, [movies]);

  // Fetch movies from the backend
  const fetchMovies = async () => {
    try {
      console.log("Fetching movies..."); // Debug log
      const response = await axios.get("http://localhost:5001/api/movies", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched movies data:", response.data); // Debug log
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
      alert("Failed to fetch movies. Check the console for details.");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token from localStorage
    setToken(""); // Reset the token state
  };

  // Render login if no token is present
  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6">Movie Database</h1>
      <button
        onClick={fetchMovies}
        className="bg-blue-500 text-white px-4 py-2 mb-4 rounded"
      >
        Fetch Movies
      </button>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 mb-4 rounded ml-4"
      >
        Logout
      </button>
      {movies.length === 0 ? (
        <p>No movies to display. Please check your API or database connection.</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li
              key={movie._id}
              className="mb-4 border p-4 rounded-lg bg-white shadow"
            >
              <h2 className="text-2xl font-semibold">{movie.title}</h2>
              <p>Year: {movie.year}</p>
              <p>Genres: {movie.genres.join(", ")}</p>
              <p className="italic">{movie.plot}</p>
              {movie.poster && (
                <img
                  src={movie.poster}
                  alt={`${movie.title} Poster`}
                  loading="lazy"
                  className="w-48 h-auto mt-4"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
