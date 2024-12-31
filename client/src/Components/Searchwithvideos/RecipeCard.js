import React from 'react';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <h3>{recipe.label}</h3>
      <img src={recipe.image} alt={recipe.label} />
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.text}</li>
        ))}
      </ul>
      <a href={recipe.url} target="_blank" rel="noopener noreferrer">View Recipe</a>
    </div>
  );
};

export default RecipeCard;
