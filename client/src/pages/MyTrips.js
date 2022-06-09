import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";
import MyTripCard from "../components/MyTripCard";

function MyTrips() {
  const [trips, setTrips] = useState([]);

  //   let trips;

  const renderMyTrips = trips.map((trip) => {
    return <MyTripCard key={trip.id} />;
  });

  return (
    <Container fluid>
      <Row className="text-center mt-5 mb-3">
        <h1>Your Trips</h1>
      </Row>

      <Row xs={1} sm={2} md={3} lg={4}>
        {renderMyTrips}
      </Row>
    </Container>
  );
}

export default MyTrips;
