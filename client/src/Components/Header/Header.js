import React, { useState, useEffect } from "react";
import { Link } from "react-router";

//import Auth from "../../utils/auth";

import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, Row, Col } from "react-bootstrap";

import "./Header.css";

const Header = () => {
//   const logout = (event) => {
//     event.preventDefault();
//     Auth.logout();
//   };

  return (
    <header>
      <div className="navbar-container">
        <Row className="title-links">
          <Col>
            <Link className="page-title" to="/">
              <h1 className="m-0">BiteBuzz</h1>
            </Link>
          </Col>
          <Col>
            <Navbar>
              <Nav.Item className="navbar-links">
                {/* {Auth.loggedIn() ? (
                  <Row>
                    <Col>
                      <Link to="/search" className="link">
                        Search
                      </Link>
                    </Col>
                    <Col>
                      <Link to="/me" className="link">
                        {Auth.getProfile().data.username}'s profile
                      </Link>
                    </Col>
                    <Col>
                      <Link onClick={logout} className="link">
                        Logout
                      </Link>
                    </Col>
                  </Row>
                ) : ( */}
                  <Row>
                    <Col>
                      <Link to="/search" className="link">
                        Search
                      </Link>
                    </Col>
                    <Col>
                      <Link to="/login" className="link">
                        Login
                      </Link>
                    </Col>
                    <Col>
                      <Link to="/signup" className="link">
                        Signup
                      </Link>
                    </Col>
                  </Row>
                {/* )} */}
              </Nav.Item>
            </Navbar>
          </Col>
        </Row>
      </div>
    </header>
  );
};


export default Header;