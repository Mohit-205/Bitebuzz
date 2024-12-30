import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

// Fetching API credentials from environment variables
const APP_ID = process.env.REACT_APP_EDAMAM_APP_ID;
const APP_KEY = process.env.REACT_APP_EDAMAM_APP_KEY;

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch recipes based on the search query
  const fetchRecipes = async (searchQuery) => {
    setLoading(true); // Set loading state
    setRecipes([]); // Clear current recipes
    try {
      const response = await fetch(
        `https://api.edamam.com/api/recipes/v2/?app_id=${APP_ID}&app_key=${APP_KEY}&q=${searchQuery}&type=public`
      );
      const data = await response.json();
      setRecipes(data.hits || []); // Set new recipes
      console.log(data.hits);
    } catch (error) {
      console.error("Error fetching recipes:", error.message);
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  // Fetch recipes on initial load (for example, chicken recipes)
  useEffect(() => {
    fetchRecipes("chicken");
  }, []);

  // Handle search form submission
  const handleSearchRecipe = (e) => {
    e.preventDefault();
    const searchQuery = e.target[0].value;
    if (searchQuery.trim()) {
      fetchRecipes(searchQuery);
    }
  };

  return (
    <div className="bg-[#faf9fb] p-10 flex-1">
      <div className="max-w-screen-lg mx-auto">
        {/* Search form */}
        <form onSubmit={handleSearchRecipe}>
          <label className="input shadow-md flex items-center gap-2">
            {/* Search icon */}
            {/* <Search size={"24"} /> */}
            <input
              type="text"
              className="text-sm md:text-md grow"
              placeholder="What do you want to cook today?"
            />
          </label>
        </form>

        {/* Header Section */}
        <h1 className="font-bold text-3xl md:text-5xl mt-4">Recommended Recipes</h1>
        <p className="text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight">
          Popular choices
        </p>

        {/* Recipe Grid */}
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* If loading, show skeleton loaders */}
          {loading
            ? [...Array(9)].map((_, index) => (
                <div key={index} className="flex flex-col gap-4 w-full">
                  <div className="skeleton h-32 w-full"></div>
                  <div className="flex justify-between">
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-24"></div>
                  </div>
                  <div className="skeleton h-4 w-1/2"></div>
                </div>
              ))
            : recipes.map(({ recipe }, index) => (
                <RecipeCard key={recipe.uri} recipe={recipe} />
              ))} {/* Avoid using index as key, use recipe.uri if available */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
