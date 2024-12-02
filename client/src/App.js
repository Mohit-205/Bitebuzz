import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Header from './Components/Header/Header'

function App() {
  return (
    <div className="App">
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header/>
        </div>
      </Router>
    </div>
  );
}

export default App;
