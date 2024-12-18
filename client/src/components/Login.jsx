import React, { useState } from "react";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Login successful!");
        setToken(data.token);
        localStorage.setItem("token", data.token); // Save token in localStorage
      } else {
        setMessage(data.message || "An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://cdn.pixabay.com/photo/2016/11/29/04/17/audience-1866738_1280.jpg')`,
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <div className="mt-4 text-center text-red-500">{message}</div>
      </form>
    </div>
  );
};

export default Login;
