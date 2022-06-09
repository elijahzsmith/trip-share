import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";

function NavBar() {
  //   function handleAccountStatus() {
  // if (isAuthenticated) {
  //   return (
  //     <>
  //       <Navbar.Toggle aria-controls="basic-navbar-nav" />
  //       <Navbar.Collapse id="basic-navbar-nav">
  //         <Nav className="me-auto">
  //           <Nav.Link href="/enteredraffles">Entered Raffles</Nav.Link>
  //           <Nav.Link href="/postdonation">Post a Donation</Nav.Link>
  //           <Nav.Link href="/yourdonations">Your Donations</Nav.Link>
  //           <NavDropdown title="More" id="basic-nav-dropdown">
  //             <NavDropdown.Item href="/profile">Account Details</NavDropdown.Item>
  //             <NavDropdown.Divider />
  //             <NavDropdown.Item href="/about">About Us</NavDropdown.Item>
  //             <NavDropdown.Item onClick={() => console.log("Logout clicked...")}>
  //               Logout
  //             </NavDropdown.Item>
  //           </NavDropdown>
  //         </Nav>
  //       </Navbar.Collapse>
  //     </>
  //   );
  //     } else {
  //       return (
  //         <>
  //           <Navbar.Toggle aria-controls="basic-navbar-nav" />
  //           <Navbar.Collapse id="basic-navbar-nav">
  //             <Nav className="me-auto">
  //               <Nav.Link href="/login">Login/Sign Up</Nav.Link>
  //               <Nav.Link href="/about">About Us</Nav.Link>
  //             </Nav>
  //           </Navbar.Collapse>
  //         </>
  //       );
  //     }
  //   }
  return (
    <Navbar bg="primary" variant="dark" expand="md" sticky="top">
      <Container>
        <Navbar.Brand href="/" className="fs-2">
          TripShare
        </Navbar.Brand>
        {/* {handleAccountStatus()} */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/profile">My Profile</Nav.Link>
            <Nav.Link href="/mytrips">My Trips</Nav.Link>
            <Nav.Link href="/favorites">My Favorites</Nav.Link>
            <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item href="/profile">
                Account Details
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/about">About Us</NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => console.log("Logout clicked...")}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
