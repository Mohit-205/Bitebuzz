const express = require("express");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Register
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error in registration" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error in login" });
  }
});

// Add to favorites
router.post("/favorite", async (req, res) => {
  const { token, recipeId } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (user.favoriteRecipes.includes(recipeId)) {
      return res.status(400).json({ message: "Recipe already in favorites" });
    }
    user.favoriteRecipes.push(recipeId);
    await user.save();
    res.json({ message: "Recipe added to favorites" });
  } catch (error) {
    res.status(500).json({ message: "Error adding to favorites" });
  }
});

// Get user favorites
router.get("/favorites", async (req, res) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    res.json({ favoriteRecipes: user.favoriteRecipes });
  } catch (error) {
    res.status(500).json({ message: "Error fetching favorites" });
  }
});

// POST /api/auth/add-favorite
router.post('/api/auth/add-favorite', authenticateToken, async (req, res) => {
  const { recipe } = req.body; // Recipe object to add
  const userId = req.user.id; // Extract user ID from token
  
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    user.favorites.push(recipe); // Add recipe to favorites
    await user.save();

    res.status(200).json({ message: 'Recipe added to favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding recipe to favorites', error });
  }
});


module.exports = router;
