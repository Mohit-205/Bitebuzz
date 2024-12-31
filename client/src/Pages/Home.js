import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router";
// import RecipeSearch from "../extras/RecipeSearch";   eliminated
import "./Home.css";
// import { homeArt } from "../assets";
//import * as Icon from "react-bootstrap-icons";
import Burger from "../Canvas/Burger";
import Pizza from "../Canvas/Pizza"
import Footer from "../Components/Footer/Footer"

const Main = () => {
  console.log('home: /')
  return (
    <Col className="home-container">
      <Row>
        <Col className="home-banner banner-container">
          <h2>Find New Recipes to Try!</h2>
          <p>Gain access to delicious recipes and join now!</p>
          {/* <img src={homeArt} alt="palceholder" /> */}
          <Container className="d-flex justify-content-center">
          <Row >
          <Col className="d-flex justify-content-center">
          <button id="get-started-btn" className="mx-2">
            <Link to="/search">Find a Recipe</Link>
          </button>

          <button id="get-started-btn" className="mx-2">
            <Link to="/shoppinglist">Shopping List</Link>
          </button>
          </Col>
          </Row>
          </Container>
        </Col>
      </Row>
      <Col className="home-description">
        <h3>Where Good Cuisine Gather</h3>
        <Row className="description-item-container">
          <Col className="description-item">
            <h4>Burger</h4>
            <p>A burger is a widely popular food item that typically consists of a cooked patty, usually made from ground meat, placed inside a sliced bread roll or bun. Here’s a comprehensive overview of burgers, including their types, preparation methods, and cultural significance.</p>
            <p>While burgers can be delicious, they also vary widely in nutritional content based on ingredients and portion sizes. Beef burgers are high in protein but can also be high in fat. Veggie burgers may offer lower calories but should be checked for nutritional balance.</p>
          </Col>
          <Col className="description-item">
            <Burger/>
          </Col>
        </Row>

        <Row className="description-item-container">
          <Col className="description-item">
            <Pizza/>
          </Col>
          <Col className="description-item">
          <h4>Pizza</h4>
            <p>Pizza is a beloved dish that originated in Italy and has become a global favorite. It consists of a round, flat base topped with various ingredients, most commonly including tomato sauce and cheese. Here’s a detailed overview of pizza, covering its history, types, ingredients, preparation methods, and cultural significance.</p>
            <p>While pizza can be delicious, its nutritional value varies significantly based on ingredients. Traditional pizzas can be high in calories due to cheese and processed meats. However, healthier versions can be made using whole grain crusts and plenty of vegetables.</p>
          </Col>
        </Row>
      </Col>
      <Footer/>
    </Col>
    
  );
};

export default Main;
//export default ThreeDModel;


// import React, { useState, useEffect } from 'react';
// import { useQuery } from '@apollo/client';

// import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

// import ThoughtList from '../components/ThoughtList';
// import ThoughtForm from '../components/ThoughtForm';

// import { QUERY_THOUGHTS } from '../utils/queries';

// import { searchRecipes } from '../utils/API';

// const Home = () => {
//   const { loading, data } = useQuery(QUERY_THOUGHTS);
//   const thoughts = data?.thoughts || [];

//   // create state for holding returned google api data
//   const [searchedBooks, setSearchedBooks] = useState([]);
//   // create state for holding our search field data
//   const [searchInput, setSearchInput] = useState('');

//   const [searchedCategories, setCategories] = useState([]);
//   const [query, setQuery] = useState('');
//   const [total, setTotalResults] = useState(0);

//   const handleFormSubmit = (async (query) => {
//     // const query = "categories.php";

//     try {
//       const response = await searchRecipes(query);

//       if (!response.ok) {
//         throw new Error('something went wrong!');
//       }

//       const { categories } = await response.json();

//       console.log("categories: ", categories);
//       setCategories(categories);

//     } catch (err) {
//       console.error(JSON.parse(JSON.stringify(err)));
//     }

//   });

//   // handleFormSubmit();

//   return (
//     <main>
//       <div className="flex-row justify-center">
//         <div
//           className="col-12 col-md-10 mb-3 p-3"
//           style={{ border: '1px dotted #1a1a1a' }}
//         >
//           <p>Result: {searchedCategories.map((category) => (
//             <div>
//               <p>Category: {category.strCategory}</p>
//               <img src={category.strCategoryThumb} alt={category.strCategory} />
//               <p>Description: {category.strCategoryDescription}</p>
//             </div>

//           ))} </p>

//           <button
//             type="button"
//             className="btn btn-danger"
//             onClick={() => handleFormSubmit('categories.php')}
//           >
//             Search
//           </button>

//           <ThoughtForm />
//         </div>
//         <div className="col-12 col-md-8 mb-3">
//           {loading ? (
//             <div>Loading...</div>
//           ) : (
//             <ThoughtList
//               thoughts={thoughts}
//               title="Some Feed for Thought(s)..."
//             />
//           )}
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Home;

//line no.62 - 152 eliminated