import React, { useState } from 'react';
import RecipeCard from './RecipeCard';

const RecipeSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [videoLinks, setVideoLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm) return;

    setLoading(true);

    // Edamam API call for recipes
    const edamamApiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchTerm}&app_id=0cb5dc1b&app_key=c2ae1539336785970a35bb702f98f801`;

    try {
      const recipeResponse = await fetch(edamamApiUrl);
      const recipeData = await recipeResponse.json();
      setRecipes(recipeData.hits);

      // YouTube API call for related videos
      const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm} recipe&key=AIzaSyC65SpGBbbCALw6ebLtk_gGdWvLKqchFfY`;
      const youtubeResponse = await fetch(youtubeApiUrl);
      const youtubeData = await youtubeResponse.json();
      setVideoLinks(youtubeData.items);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setLoading(false);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}

      <div>
        {recipes.length > 0 && (
          <div>
            <h2>Recipes</h2>
            <div className="recipe-list">
              {recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe.recipe} />
              ))}
            </div>
          </div>
        )}

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
    </div>
  );
};

export default RecipeSearch;
