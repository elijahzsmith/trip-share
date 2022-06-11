import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { useSelector, useDispatch } from "react-redux";
import { createLogout } from "../features/users/usersSlice";

function NavBar() {
  const history = useHistory();
  const currUser = useSelector((state) => state.users.authorized);
  const dispatch = useDispatch();

  const dispatchLogout = () => {
    dispatch(createLogout());
    // history.push("/login");
  };
  // console.log("current user (Navbar auth): ", currUser);

  return (
    <div>
      {currUser ? (
        <Navbar bg="primary" variant="dark" expand="md" sticky="top">
          <Container>
            <Navbar.Brand href="/" className="fs-2">
              TripShare
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/profile">My Profile</Nav.Link>
                <Nav.Link href="/mytrips">My Trips</Nav.Link>
                <Nav.Link href="/posttrip">Post a Trip</Nav.Link>
                <Nav.Link href="/favorites">My Favorites</Nav.Link>
                <Nav.Link href="/login">Login/Signup</Nav.Link>
                <NavDropdown title="More" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/profile">
                    Account Details
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/about">About Us</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => dispatchLogout()}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : (
        <Navbar bg="primary" variant="dark" expand="md" sticky="top">
          <Container>
            <Navbar.Brand href="/" className="fs-2">
              TripShare
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/favorites">General</Nav.Link>
                <Nav.Link href="/login">Login/Signup</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </div>
  );
}

export default NavBar;
