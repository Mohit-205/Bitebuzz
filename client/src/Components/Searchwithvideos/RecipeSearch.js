import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard'; // Assuming RecipeCard component is imported
import ingredientsData from './ingredients.json'; // Ensure the correct path to your JSON file
import { Button, Row } from 'react-bootstrap';
import "./RecipeSearch.css";

const RecipeSearch = () => {
  const [recipes, setRecipes] = useState([]);
  const [videoLinks, setVideoLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);

  // API credentials for Edamam
  const appId = '119b1f5d';
  const appKey = 'b02acfd3fb2ab3a0d297e1099f1c5743';

  // Function to fetch recipes based on search term or random recipes
  const fetchRecipes = async (query) => {
    setLoading(true);
    setError(null);

    try {
      // Randomly select an ingredient from the imported ingredients JSON
      const randomIngredient = ingredientsData.ingredients[Math.floor(Math.random() * ingredientsData.ingredients.at(-1)?.length || 0)];

      const searchQuery = query || randomIngredient;  // Use search term or random ingredient
      const edamamApiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${appId}&app_key=${appKey}&count=9`;

      // Fetch recipes from Edamam
      const recipeResponse = await fetch(edamamApiUrl);
      const recipeData = await recipeResponse.json();
      setRecipes(recipeData.hits);

      // If there is a search term, fetch related YouTube videos
      if (query) {
        const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query} recipe&key=AIzaSyC65SpGBbbCALw6ebLtk_gGdWvLKqchFfY&maxResults=20`;
        const youtubeResponse = await fetch(youtubeApiUrl);
        const youtubeData = await youtubeResponse.json();
        setVideoLinks(youtubeData.items);
      } else {
        setVideoLinks([]); // Clear video links if no search term
      }
    } catch (error) {
      setError('Error fetching data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch recipes when the search term changes or on initial load
  useEffect(() => {
    fetchRecipes(searchTerm);
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.search.value);  // Update search term when form is submitted
  };

  const handleClearSearch = () => {
    setSearchTerm('');  // Clear search term to fetch random recipes
  };

  const toggleFavorite = (recipe) => {
    const isFavorite = favorites.some((fav) => fav.uri === recipe.uri);
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.uri !== recipe.uri));
    } else {
      setFavorites([...favorites, recipe]);
    }
  };

  const isFavorite = (recipe) => favorites.some((fav) => fav.uri === recipe.uri);

  const RandomRecipe = () => {
    const [randomRecipes, setRandomRecipes] = useState([]);
    const [loadingRandom, setLoadingRandom] = useState(true);
    const [errorRandom, setErrorRandom] = useState(null);

    // Fetch random recipes when the component mounts
    const fetchRandomRecipes = async () => {
      setLoadingRandom(true);
      setErrorRandom(null);

      try {
        // Randomly select an ingredient from the imported ingredients JSON
        const randomIngredient = ingredientsData.ingredients[Math.floor(Math.random() * ingredientsData.ingredients.length)];
        const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${randomIngredient}&app_id=${appId}&app_key=${appKey}&count=9`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.hits?.some(() => true)) {
          const recipesList = data.hits.map((hit) => hit.recipe);
          setRandomRecipes(recipesList);
        } else {
          setErrorRandom('No recipes found.');
        }
      } catch (err) {
        setErrorRandom('Failed to fetch recipes: ' + err.message);
      } finally {
        setLoadingRandom(false);
      }
    };

    useEffect(() => {
      fetchRandomRecipes();
    }, []);

    if (loadingRandom) {
      return <div>Loading random recipes...</div>;
    }

    if (errorRandom) {
      return <div>{errorRandom}</div>;
    }

    return (
      <div>
        <h2>Random Recipes</h2>
        <div className="recipe-list">
          {randomRecipes.length > 0 ? (
            randomRecipes.map((recipe, index) => (
              <div key={index} className="recipe-card">
                <h3>{recipe.label}</h3>
                <img src={recipe.image} alt={recipe.label} />
                <p>{recipe.source}</p>
                <a href={recipe.url} target="_blank" rel="noopener noreferrer">
                  View Recipe
                </a>
                <Row>
                <Button
                  className={`favorite-btn ${isFavorite(recipe) ? 'favorited' : ''}`}
                  onClick={() => toggleFavorite(recipe)}
                >
                  {isFavorite(recipe) ? '❤️' : '🤍'}
                </Button>
                </Row>
              </div>
            ))
          ) : (
            <p>No recipes found.</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Search Form */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          placeholder="Search for recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className='recipebtn' type="button" onClick={handleClearSearch}>Clear Search</button>
      </form>

      {/* Display Random Recipe if No Search Term */}
      {!searchTerm && <RandomRecipe />}

      {loading && <p>Loading...</p>}

      {/* Display Recipes Only if Search Term is Provided */}
      {searchTerm && (
        <div>
          <h2>Recipes for "{searchTerm}"</h2>
          <div className="recipe-list">
            {recipes.length > 0 ? (
              recipes.map((recipe, index) => (
                <div key={index} className="recipe-card">
                  <h3>{recipe.recipe.label}</h3>
                  <img src={recipe.recipe.image} alt={recipe.recipe.label} />
                  <p>{recipe.recipe.source}</p>
                  <a href={recipe.recipe.url} target="_blank" rel="noopener noreferrer">
                    View Recipe
                  </a>
                  <Row>
                  <Button
                    className={`favorite-btn ${isFavorite(recipe.recipe) ? 'favorited' : ''}`}
                    onClick={() => toggleFavorite(recipe.recipe)}
                  >
                    {isFavorite(recipe.recipe) ? '❤️' : '🤍'}
                  </Button>
                  </Row>
                </div>
              ))
            ) : (
              <p>No recipes found.</p>
            )}
          </div>

          {/* Display Related YouTube Videos for the Searched Recipe */}
          {videoLinks.length > 0 && (
            <div>
              <h2>Related Videos</h2>
              <div className="video-list">
                {videoLinks.map((video, index) => (
                  <div key={index}>
                    <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener noreferrer">
                      <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
                      <p>{video.snippet.title}</p>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecipeSearch;