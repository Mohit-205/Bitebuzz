import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import Header from './Components/Header/Header'
import Main from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Favorites from "./Pages/Favorites.js";
import NotFound from "./Pages/NotFound"
import RecipeSearch from './Components/Searchwithvideos/RecipeSearch.js'

import ShoppingList from "./Components/Shoppinglist/ShoppingList.js";

//import SearchFrom from './Pages/SearchForm'

function App() {
  const [user, setUser] = useState(localStorage.getItem("token"));
  return (
    <div className="App">
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header/>
          <div className="container-fluid">
            <Routes>
              <Route path="/" exact element={<Main/>} />
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/signup" element={<Signup setUser={setUser} />} />
              <Route path="/favorites" element={user ? <Favorites /> : <Navigate to="/login" replace />} />
              <Route path="/search" element={<RecipeSearch />} />
              <Route path="/shoppinglist" element={<ShoppingList />} />

              <Route component={NotFound} />


            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
