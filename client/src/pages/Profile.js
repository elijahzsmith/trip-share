import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleAuth } from "../features/users/usersSlice";
import { fetchTrips } from "../features/trips/tripsSlice";
import MyTripCard from "../components/MyTripCard";
import Row from "react-bootstrap/Row";

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
        <h1>Account Details</h1>
        <hr></hr>
        <h2>Name: {currUser.name}</h2>
        <h3>Username: {currUser.username}</h3>
        <h6>Age: {currUser.age}</h6>
        <Button className="me-2" onClick={() => history.push("/editprofile")}>
          Edit Profile
        </Button>
        <Button className="me-2" onClick={() => history.push("/mytrips")}>
          Your Trip Posts
        </Button>
        <Button className="me-2" onClick={() => history.push("/favorites")}>
          Your Favorites
        </Button>
        <Button className="me-2" onClick={() => history.push("/following")}>
          Following: {currUser.followees.length}
        </Button>
        <Button className="me-2" onClick={() => history.push("/followers")}>
          Followers: {currUser.followers.length}
        </Button>
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
