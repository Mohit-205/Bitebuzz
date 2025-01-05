import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To hold error messages
  const navigate = useNavigate();

  // Email validation function
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  };

  // Password validation function (minimum 6 characters, must contain at least one number and one letter)
  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordPattern.test(password);
  };

  // Username validation function (non-empty, minimum length of 3 characters)
  const validateUsername = (username) => {
    return username.trim().length >= 3;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset previous errors

    // Validate form fields
    if (!username.trim()) {
      setError("Username is required.");
      return;
    }

    if (!validateUsername(username)) {
      setError("Username must be at least 3 characters long.");
      return;
    }

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password.trim()) {
      setError("Password is required.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long and contain both letters and numbers.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Error in signing up");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      setUser(data.token);
      navigate("/login"); // Navigate to login after successful signup
    } catch (error) {
      setError(error.message); // Show error message if signup fails
    }
  };

  return (
    <div className="signup-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        {/* Username Input */}
        <input
          type="text"
          className="signup-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* Email Input */}
        <input
          type="email"
          className="signup-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Password Input */}
        <input
          type="password"
          className="signup-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="signup-button">Sign Up</button>
        
        {/* Error Message Display */}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
