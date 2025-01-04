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
        .then((data) => setFavoriteRecipes(data.favoriteRecipes)) // Assumes each favorite recipe is an object
        .catch((error) => alert(error.message));
    }
  }, []);

  return (
    <div>
      <h2>Your Favorite Recipes</h2>
      {favoriteRecipes.length > 0 ? (
        <ul>
          {favoriteRecipes.map((recipe) => (
            <li key={recipe.uri} style={{ marginBottom: "1rem" }}>
              <h3>{recipe.label}</h3>
              <img
                src={recipe.image}
                alt={recipe.label}
                style={{ width: "150px", borderRadius: "10px" }}
              />
              <p>Source: {recipe.source}</p>
              <a
                href={recipe.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "blue" }}
              >
                View Full Recipe
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite recipes yet. Add some to see them here!</p>
      )}
    </div>
  );
};

export default Favorites;
