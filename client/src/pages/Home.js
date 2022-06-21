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
import ScrollButton from "../components/ScrollButton";
// import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
// import InputGroup from "react-bootstrap/InputGroup";
// import FormControl from "react-bootstrap/FormControl";
// import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";

function Home() {
  const [filterPosts, setFilterPosts] = useState(false);
  const [alert, setAlert] = useState(false);
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
        <TripItem
          key={trip.id}
          trip={trip}
          allComments={allComments}
          setAlert={setAlert}
        />
      ))
    : null;

  function renderAlert() {
    return (
      <Modal show={alert} onHide={() => setAlert(false)}>
        <Modal.Header className="bg-dark text-white" closeButton>
          <Modal.Title>Log In or Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You must be logged in to enter a raffle. Click one of the options
          below to get raffle ready. Or click away to continue browsing as a
          guest.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => history.push("/login")}>
            Login
          </Button>
          <Button
            variant="secondary"
            className="text-white"
            onClick={() => history.push("/signup")}
          >
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Container fluid>
      {renderAlert()}
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
      <ScrollButton />
    </Container>
  );
}

export default Home;

{
  /* {filterPosts ? (
              <Row className="d-flex justify-content-end my-2">
                <Col className="mx-auto h-100 my-2">
                  <InputGroup>
                    <FormControl
                      placeholder="Search TripShare..."
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                      name="search"
                      //   value={currSearch}
                      //   onChange={(e) => setCurrSearch(e.target.value)}
                    />
                    <Dropdown as={ButtonGroup}>
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
                    </Dropdown>
                  </InputGroup>
                </Col>
              </Row>
            ) : null} */
}
