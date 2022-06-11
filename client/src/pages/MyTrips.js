import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";
import MyTripCard from "../components/MyTripCard";

function MyTrips() {
  // const [trips, setTrips] = useState([]);

  const trips = useSelector((state) => state.users.entities.trips);

  if (!trips) {
    return <h1>"loading..."</h1>;
  }
  const renderMyTrips = trips.map((trip) => {
    return <MyTripCard key={trip.id} trip={trip} />;
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
