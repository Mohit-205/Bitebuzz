const FavoriteRecipes = () => {
    const [favorites, setFavorites] = useState([]);
  
    useEffect(() => {
      const fetchFavorites = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;
        const response = await fetch(`http://localhost:5000/api/auth/get-favorites?token=${token}`);
        const data = await response.json();
        if (response.ok) {
          setFavorites(data.favoriteRecipes);
        } else {
          console.error("Error fetching favorites:", data.message);
        }
      };
      fetchFavorites();
    }, []);
  
    return (
      <div>
        <h2>Your Favorite Recipes</h2>
        <div className="recipe-list">
          {favorites.length > 0 ? (
            favorites.map((recipe, index) => (
              <div key={index} className="recipe-card">
                <h3>{recipe.label}</h3>
                <img src={recipe.image} alt={recipe.label} />
                <p>{recipe.source}</p>
                <a href={recipe.url} target="_blank" rel="noopener noreferrer">
                  View Recipe
                </a>
              </div>
            ))
          ) : (
            <p>No favorite recipes yet.</p>
          )}
        </div>
      </div>
    );
  };
  