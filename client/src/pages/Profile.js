import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFollows } from "../features/follows/followsSlice";
import { fetchTrips } from "../features/trips/tripsSlice";
import { setUser } from "../features/users/usersSlice";
import MyTripCard from "../components/MyTripCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const currUser = useSelector((state) => state.users.entities);
  const authorized = useSelector((state) => state.users.authorized);
  useEffect(() => {
    dispatch(fetchTrips());
    dispatch(fetchFollows());
    dispatch(setUser());
  }, []);

  const allTrips = useSelector((state) => state.trips.entities);
  const allFollows = useSelector((state) => state.follows.entities);

  const yourFollowing = allFollows.filter(
    (follow) => follow.follower.id === currUser.id
  );
  const yourFollowers = allFollows.filter(
    (follow) => follow.followee.id === currUser.id
  );

  if (!authorized) {
    return <h1>Login...</h1>;
  }
  const yourTrips = allTrips.filter((trip) => {
    return trip.user.id === currUser.id;
  });

  const renderYourTrips = yourTrips.map((trip) => (
    <MyTripCard key={trip.id} trip={trip} />
  ));

  return (
    <Container fluid>
      <Container className="mx-auto mt-5">
        <h1>Your Profile</h1>
        <hr></hr>
        <Row id="profile-details" style={{ maxHeight: 200 }}>
          <Col className="w-auto">
            <h2>Name: {currUser.name}</h2>
            <h3>Username: {currUser.username}</h3>
            <h6>Age: {currUser.age}</h6>
          </Col>
          <Col
            style={{
              display: "flex",
              flexFlow: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <img
              src={currUser.profile_picture}
              alt="profile"
              className="h-50 rounded-circle"
            ></img>
          </Col>
        </Row>

        <Row>
          <Col>
            <Button
              className="me-2"
              // variant="turquoise"
              variant="primary"
              onClick={() => history.push("/editprofile")}
            >
              Edit Profile
            </Button>
          </Col>
          <Col>
            <Button
              className="me-2"
              // variant="turquoise"
              variant="primary"
              onClick={() => history.push("/mytrips")}
            >
              Your Posts
            </Button>
          </Col>
          <Col>
            <Button
              className="me-2"
              // variant="turquoise"
              variant="primary"
              onClick={() => history.push("/favorites")}
            >
              Your Favorites
            </Button>
          </Col>

          <Col className="pr-none">
            <Button
              className="me-2"
              variant="turquoise"
              onClick={() => history.push("/following")}
            >
              Following: {yourFollowing.length}
            </Button>
          </Col>
          <Col>
            <Button
              className="me-2"
              variant="turquoise"
              onClick={() => history.push("/followers")}
            >
              Followers: {yourFollowers.length}
            </Button>
          </Col>
        </Row>
        <br></br>
        <hr></hr>
      </Container>
      <Container>
        <Row xs={1} sm={2} md={3} lg={4}>
          {renderYourTrips}
        </Row>
      </Container>
    </Container>
  );
}

export default Profile;
