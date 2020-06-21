import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Welcome from "./containers/Welcome";
import Session from "./containers/Session";

function App() {
  function displayNavLink(name, to) {
    return (
      <Link to={to} data-rb-event-key={to} className="nav-link">
        {name}
      </Link>
    );
  }

  const [globalError, setGlobalError] = useState("");
  const [isInterceptorsSet, setIsInterceptorSet] = useState(false);

  /**
   * Let's intercept any global errors (e.g. 404, 500) and display an error message.
   * All functional errors should be returned in the response as an error field
   * with a status of 200 and dealt with in the container calling it.
   */
  if (!isInterceptorsSet) {
    axios.interceptors.request.use((request) => {
      setGlobalError(""); // Clearing any errors before sending the request
      return request;
    });
    axios.interceptors.response.use(null, (error) => {
      setGlobalError(error.message);
      console.log("Error message: " + error.message);
    });
    setIsInterceptorSet("true"); // Set these up once
  }

  return (
    <Router>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/">Planning Poker</Navbar.Brand>
        <Nav className="mr-auto">
          {displayNavLink("Welcome", "/")}
          {displayNavLink("About", "/about")}
          {displayNavLink("Session", "/session")}
        </Nav>
      </Navbar>
      <div className="App-global-error">
        <strong>{globalError}</strong>
      </div>
      <Switch>
        <Route path="/about">
          <h1>About- Placeholder</h1>
        </Route>
        <Route path="/session/:id/:email">
          <Session />
        </Route>
        <Route path="/">
          <Welcome />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
