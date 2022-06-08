import React from "react";
import Container from "react-bootstrap/esm/Container";

function About() {
  return (
    <Container fluid>
      <Container className="mx-auto mt-5">
        <h1>TripShare</h1>
        <br></br>
        <h4>
          <strong>The</strong> Travel Network
        </h4>
        <hr></hr>
        <p>TripShare is an online donation based raffle platform. </p>
        <p>
          Users can post about a trip, sharing them with their network of
          friends.
        </p>
      </Container>
    </Container>
  );
}

export default About;
