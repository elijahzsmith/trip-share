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
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.entities);

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
            <Row xs={1} sm={2} md={3} lg={4}>
              {renderTrips}
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
