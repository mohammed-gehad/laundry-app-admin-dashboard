import React, { useState } from "react";
import "./App.css";
import Login from "./features/auth/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./features/auth/authSlice";
import Orders from "./features/orders/Orders";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav } from "react-bootstrap";

function App() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <Nav defaultActiveKey="/home" as="ul">
        <Nav.Item as="li">
          <Nav.Link href="/home">home</Nav.Link>
        </Nav.Item>

        {!token ? (
          <Nav.Item as="li">
            <Nav.Link href="/login">login</Nav.Link>
          </Nav.Item>
        ) : (
          <>
            <Nav.Item as="li">
              <Nav.Link href="/orders">orders</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link onClick={() => dispatch(logout())}>logout</Nav.Link>
            </Nav.Item>
          </>
        )}
      </Nav>
      <Router>
        <div>
          {token ? (
            <Switch>
              <Route path="/orders">
                <Orders />
              </Route>
              <Route path="/">
                <p>hello world</p>
              </Route>
            </Switch>
          ) : (
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/">
                <p>hello world</p>
              </Route>
            </Switch>
          )}
        </div>
      </Router>
    </div>
  );
}

export default App;
