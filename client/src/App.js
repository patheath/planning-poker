import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Welcome from './containers/Welcome';
import Session from './containers/Session';


function App() {

  function displayNavLink(name, to) {
    return (
      <Link
        to={to}
        data-rb-event-key={to}
        className="nav-link"
      >
        {name}
      </Link>
    )
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
      <Switch>
        <Route path="/about">
          <h1>About- Placeholder</h1>
        </Route>
        <Route path="/session">
          <Session />
        </Route>
        <Route path="/">
          <Welcome />
        </Route>
      </Switch>
    </Router >
  );
}

export default App;
