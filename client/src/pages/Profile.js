import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleAuth } from "../features/users/usersSlice";
import { fetchTrips } from "../features/trips/tripsSlice";
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
  }, []);
  const allTrips = useSelector((state) => state.trips.entities);

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
        {/* <h1>Account Details</h1> */}
        <hr></hr>
        <Row style={{ maxHeight: 200 }}>
          <Col className="w-auto">
            <h2>Name: {currUser.name}</h2>
            <h3>Username: {currUser.username}</h3>
            <h6>Age: {currUser.age}</h6>
          </Col>
          <Col>
            <img
              src={currUser.profile_picture}
              alt="profile"
              className="h-50 rounded-circle"
            ></img>
          </Col>
        </Row>
        <Row>
          <Col
          // className="pr-none"
          >
            <Button
              className="me-2"
              onClick={() => history.push("/editprofile")}
            >
              Edit Profile
            </Button>
          </Col>
          <Col
          // className="pr-none"
          >
            <Button className="me-2" onClick={() => history.push("/mytrips")}>
              Your Trip Posts
            </Button>
          </Col>
          <Col
          // className="pr-none"
          >
            <Button className="me-2" onClick={() => history.push("/favorites")}>
              Your Favorites
            </Button>
          </Col>

          <Col className="pr-none">
            <Button className="me-2" onClick={() => history.push("/following")}>
              Following: {currUser.followees.length}
            </Button>
          </Col>
          <Col
          // className="pr-none"
          >
            <Button className="me-2" onClick={() => history.push("/followers")}>
              Followers: {currUser.followers.length}
            </Button>
          </Col>
        </Row>
        <br></br>
        <hr></hr>
        {/* <br></br> */}
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
