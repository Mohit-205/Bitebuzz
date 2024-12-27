import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Header from './Components/Header/Header'
import Main from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'

//import SearchFrom from './Pages/SearchForm'

function App() {
  return (
    <div className="App">
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header/>
          <div className="container-fluid">
            <Routes>
              <Route path="/" exact element={<Main/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
