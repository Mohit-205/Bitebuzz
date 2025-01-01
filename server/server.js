// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./Routes/Auth");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes (authentication and recipe routes will go here)

// Starting the server
app.listen(process.env.PORT || 5000, () => {
  console.log("Server running...");
});
