import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import OtherUsersTripItem from "../components/OtherUsersTripItem";
import TripItem from "../components/TripItem";
import { fetchTrips } from "../features/trips/tripsSlice";
import { fetchComments } from "../features/comments/commentsSlice";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.users.entities);
  // const trip = useSelector((state) => state.trips.entities);
  // console.log("trip: ", user);

  if (!user) {
    <h1>Welcome to TripShare...</h1>;
    <h2>
      <strong>The</strong>travel sharing network
    </h2>;
    <button onClick={() => history.push("login")}>
      <strong>The</strong>travel sharing network
    </button>;
  }
  useEffect(() => {
    dispatch(fetchTrips());
    dispatch(fetchComments());
  }, []);
  // useEffect(() => {
  //   dispatch(fetchComments());
  // }, []);

  //
  //
  //
  //
  //
  //
  //
  const allComments = useSelector((state) => state.comments.entities);
  // const filteredComments = allComments.forEach((el) =>
  //   el.filter((comment) => comment.trip.id === trip.id)
  // );
  //
  //
  //
  //
  //
  //
  //

  const trips = useSelector((state) => {
    return state.trips.entities;
  });
  // const trips = useSelector((state) => {
  //   return state.trips.entities;
  // });
  if (!trips) {
    <h1>Loading...</h1>;
  }
  // console.log("trips: ", trips);
  // const renderTrips = trips.map((trip) => {
  //   return <OtherUsersTripItem key={trip.id} trip={trip} />;
  // });
  const renderTrips = trips.map((trip) => {
    return <TripItem key={trip.id} trip={trip} allComments={allComments} />;
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
