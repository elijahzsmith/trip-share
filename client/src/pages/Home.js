import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TripItem from "../components/TripItem";
import { setUser } from "../features/users/usersSlice";
import { fetchTrips } from "../features/trips/tripsSlice";
import { fetchComments } from "../features/comments/commentsSlice";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";

function Home() {
  const [filterPosts, setFilterPosts] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.users.entities);

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
    dispatch(setUser());
    dispatch(fetchTrips());
    dispatch(fetchComments());
  }, []);

  const allComments = useSelector((state) => state.comments.entities);

  const trips = useSelector((state) => {
    return state.trips.entities;
  });

  if (!trips) {
    <h1>Loading...</h1>;
  }
  const followeesIds = user.followees;

  if (!user) {
    <h1>Loading...</h1>;
  }

  if (!followeesIds) {
    <h1>Loading...</h1>;
  }
  const renderTrips = trips.map((trip) => {
    return <TripItem key={trip.id} trip={trip} allComments={allComments} />;
  });

  const followeesIds2 = followeesIds ? followeesIds.map((el) => el.id) : null;

  const selectTripsFromFollowing = followeesIds2
    ? trips.filter(
        (trip) =>
          followeesIds2.includes(trip.user.id) || trip.user.id === user.id
      )
    : null;

  const renderTripsFromFollowing = selectTripsFromFollowing
    ? selectTripsFromFollowing.map((trip) => (
        <TripItem key={trip.id} trip={trip} allComments={allComments} />
      ))
    : null;

  return (
    <Container fluid>
      <Row className="d-flex justify-content-end my-2">
        <Col className="mx-auto h-100 my-2">
          <div>
            <Row className="d-flex">
              <Col className="mx-auto h-100 my-2">
                <Button
                  variant="turquoise"
                  onClick={() => setFilterPosts(false)}
                >
                  {filterPosts ? (
                    <i className="bi bi-people"></i>
                  ) : (
                    <>
                      <i class="bi bi-people-fill"></i>
                      <label>Following</label>
                    </>
                  )}
                </Button>
              </Col>
              <Col className="mx-auto h-100 my-2">
                <Button
                  variant="turquoise"
                  onClick={() => setFilterPosts(true)}
                >
                  {filterPosts ? (
                    <>
                      <i class="bi bi-binoculars-fill"></i>
                      <label>Explore</label>
                    </>
                  ) : (
                    <i class="bi bi-binoculars"></i>
                  )}
                </Button>
              </Col>
            </Row>

            <Row xs={1} sm={2} md={3} lg={4}>
              {filterPosts ? renderTrips : renderTripsFromFollowing}
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
