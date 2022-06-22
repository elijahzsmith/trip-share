import React from "react";
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
    dispatch(createLogout(history));
  };

  return (
    <div>
      {currUser ? (
        <Navbar bg="nav-bar" variant="dark" expand="md">
          <Container>
            <Navbar.Brand onClick={() => history.push("/")} className="fs-2">
              TripShare
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link onClick={() => history.push("/")}>Home</Nav.Link>
                <Nav.Link onClick={() => history.push("/profile")}>
                  My Profile
                </Nav.Link>
                <Nav.Link onClick={() => history.push("/favorites")}>
                  My Favorites
                </Nav.Link>

                <NavDropdown title="More" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => history.push("/mytrips")}>
                    My Trips
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => history.push("/posttrip")}>
                    Post a Trip
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => history.push("/about")}>
                    About Us
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => dispatchLogout()}>
                    Signout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : (
        <Navbar bg="nav-bar2" variant="dark" expand="md" sticky="top">
          <Container>
            <Navbar.Brand href="/" className="fs-2">
              TripShare
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
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
