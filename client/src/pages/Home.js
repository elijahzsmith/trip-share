import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import OtherUsersTripItem from "../components/OtherUsersTripItem";
import TripItem from "../components/TripItem";
import { fetchTrips } from "../features/trips/tripsSlice";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.entities);
  // const trip = useSelector((state) => state.trips.entities);
  // console.log("trip: ", trip);

  useEffect(() => {
    dispatch(fetchTrips());
  }, []);
  const trips = useSelector((state) => {
    return state.trips.entities;
  });
  // const trips = useSelector((state) => {
  //   return state.trips.entities;
  // });
  if (!trips) {
    <h1>Loading...</h1>;
  }
  console.log("trips: ", trips);
  // const renderTrips = trips.map((trip) => {
  //   return <OtherUsersTripItem key={trip.id} trip={trip} />;
  // });
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
