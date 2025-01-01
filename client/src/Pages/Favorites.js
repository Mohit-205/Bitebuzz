// src/components/Favorites.js
import React, { useEffect, useState } from "react";

const Favorites = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`http://localhost:5000/api/auth/favorites?token=${token}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error fetching favorites");
          }
          return response.json();
        })
        .then((data) => setFavoriteRecipes(data.favoriteRecipes))
        .catch((error) => alert(error.message));
    }
  }, []);

  return (
    <div>
      <h2>Your Favorite Recipes</h2>
      <ul>
        {favoriteRecipes.map((recipeId) => (
          <li key={recipeId}>{recipeId}</li> // Display recipe ID or data
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
