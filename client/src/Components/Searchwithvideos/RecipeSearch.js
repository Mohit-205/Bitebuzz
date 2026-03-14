import React, { useState, useEffect } from "react";
import ingredientsData from "./ingredients.json";
import { Button, Row, Col } from "react-bootstrap";
import "./RecipeSearch.css";

const RecipeSearch = () => {

  const [recipes, setRecipes] = useState([]);
  const [videoLinks, setVideoLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);

  const appId = process.env.REACT_APP_EDAMAM_APP_ID;
  const appKey = process.env.REACT_APP_EDAMAM_APP_KEY;
  const youtubeKey = process.env.REACT_APP_YOUTUBE_API_KEY;

  const fetchRecipes = async (query) => {

    setLoading(true);
    setError(null);

    try {

      const randomIngredient =
        ingredientsData.ingredients[
          Math.floor(Math.random() * ingredientsData.ingredients.length)
        ];

      const searchQuery = query || randomIngredient;

      const recipeUrl =
        `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${appId}&app_key=${appKey}&count=9`;

      const recipeResponse = await fetch(recipeUrl);
      const recipeData = await recipeResponse.json();

      setRecipes(recipeData.hits || []);

      if (query) {

        const youtubeUrl =
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query} recipe&key=${youtubeKey}&maxResults=12`;

        const youtubeResponse = await fetch(youtubeUrl);
        const youtubeData = await youtubeResponse.json();

        setVideoLinks(youtubeData.items || []);

      } else {

        setVideoLinks([]);

      }

    } catch (err) {

      setError("Error fetching data: " + err.message);

    } finally {

      setLoading(false);

    }
  };

  // debounce search
  useEffect(() => {

    const delay = setTimeout(() => {
      fetchRecipes(searchTerm);
    }, 500);

    return () => clearTimeout(delay);

  }, [searchTerm]);

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  // fetch favorites
  useEffect(() => {

    const fetchFavorites = async () => {

      try {

        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(
          `http://localhost:5000/api/auth/get-favorites?token=${token}`
        );

        const data = await response.json();

        if (response.ok) {
          setFavorites(data.favoriteRecipes);
        }

      } catch (error) {
        console.error("Error fetching favorites:", error);
      }

    };

    fetchFavorites();

  }, []);

  const toggleFavorite = async (recipe) => {

    const isFav = favorites.some((fav) => fav.uri === recipe.uri);

    if (isFav) {

      setFavorites(favorites.filter((fav) => fav.uri !== recipe.uri));

    } else {

      setFavorites([...favorites, recipe]);

      try {

        const token = localStorage.getItem("token");

        if (!token) {
          alert("Please log in to save favorites!");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/auth/add-favorite",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, recipe }),
          }
        );

        const data = await response.json();

        if (!response.ok) alert(data.message);

      } catch (error) {

        console.error("Error adding favorite:", error);

      }
    }
  };

  const isFavorite = (recipe) =>
    favorites.some((fav) => fav.uri === recipe.uri);

  return (

    <div className="container">

      {/* Centered Search */}
      <Row className="justify-content-center mt-4">
        <Col md="6" className="d-flex justify-content-center gap-2">

          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
          />

          <Button
            variant="danger"
            onClick={handleClearSearch}
          >
            Clear
          </Button>

        </Col>
      </Row>

      
      {/* Title */}
      <h2 className="text-center mt-4">
        {searchTerm ? `Recipes for "${searchTerm}"` : "Random Recipes"}
      </h2>

      {/* Loading */}
      {loading && <p className="text-center mt-3">Loading...</p>}

      {/* Error */}
      {error && <p className="text-center">{error}</p>}


      {/* Recipe List */}
      <div className="recipe-list">

        {recipes.length > 0 ? (

          recipes.map((recipeObj, index) => {

            const recipe = recipeObj.recipe;

            return (

              <div key={index} className="recipe-card">

                <h3>{recipe.label}</h3>

                <img src={recipe.image} alt={recipe.label} />

                <p>{recipe.source}</p>

                <a
                  href={recipe.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Recipe
                </a>

                <Row className="mt-2">

                  <Button
                    className={`favorite-btn ${isFavorite(recipe) ? "favorited" : ""}`}
                    onClick={() => toggleFavorite(recipe)}
                  >
                    {isFavorite(recipe) ? "❤️" : "🤍"}
                  </Button>

                </Row>

              </div>
            );

          })

        ) : (

          <p className="text-center">No recipes found.</p>

        )}

      </div>

      {/* Videos */}
      {videoLinks.length > 0 && (

        <div className="mt-5">

          <h2 className="text-center">Related Videos</h2>

          <div className="video-list">

            {videoLinks.map((video, index) => (

              <div key={index}>

                <a
                  href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >

                  <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                  />

                  <p>{video.snippet.title}</p>

                </a>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>
  );
};

export default RecipeSearch;