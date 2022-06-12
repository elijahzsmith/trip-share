import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TripItem from "../components/TripItem";
import { fetchTrips } from "../features/trips/tripsSlice";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";

function Home() {
  const trips = useSelector((state) => {
    return state.trips.entities;
  });
  // console.log("trips from useSelector (Home): ", trips);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.entities);
  console.log(user);

  useEffect(() => {
    dispatch(fetchTrips());
  }, []);

  const renderTrips = trips.map((trip) => {
    return <TripItem key={trip.id} trip={trip} />;
  });

  return (
    <Container fluid>
      <Row className="d-flex justify-content-end my-2">
        <Col className="mx-auto h-100 my-2">
          <div>
            Home
            {renderTrips}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
