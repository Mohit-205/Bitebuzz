import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css"; // For styling

function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>Oops! Recipe Not Found</h1>
        <p>Looks like the recipe you're looking for doesn't exist. Let's get you back on track.</p>
        <Link to="/" className="back-home-button">Go Back to Homepage</Link>
      </div>
    </div>
  );
};

export default NotFound;
