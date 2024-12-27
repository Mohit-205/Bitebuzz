
//const spoonApiKey = process.env.SPOONACULA_API_KEY;
//const theMealDbApiKey = process.env.REACT_APP_THE_MEAL_DB_API_KEY;
const apiId = process.env.EDAMAM_API_ID;
const apiKey = process.env.EDAMAM_API_KEY;
//const spoonApiKey = "5193520e48444e02af81cec913e14cc2";
// make a search to spoonacular api
// Document https://spoonacular.com/food-api/docs


// API call: https://api.spoonacular.com/recipes/complexSearch
// Example: https://api.spoonacular.com/recipes/complexSearch/?cuisine=Korean&apiKey=spoonApiKey


// https://www.themealdb.com/api.php

export const searchRecipes = (query) => {
  //return fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonApiKey}${query}`);

  //return fetch(`https://www.themealdb.com/api/json/v2/${theMealDbApiKey}/${query}`);
  //return fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=random&app_id=${apiId}&app_key=${apiKey}`);

  //return fetch(`https://api.edamam.com/search?q=${query}&app_id=${apiId}&app_key=${apiKey}`)
};