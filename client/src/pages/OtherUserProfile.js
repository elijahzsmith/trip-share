import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneOtherUser } from "../features/users/otherUsersSlice";
import {
  fetchFollows,
  addFollow,
  unfollow,
} from "../features/follows/followsSlice";
import { fetchTrips } from "../features/trips/tripsSlice";
import OtherUsersTripItem from "../components/OtherUsersTripItem";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";

function OtherUserProfile() {
  let locate = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.otherUsers.entities);
  const mainUser = useSelector((state) => state.users.entities);
  const followers = useSelector((state) => state.follows.entities);

  const otherUsersTrips = useSelector(
    (state) => state.otherUsers.entities.trips
  );
  const tripsState = useSelector((state) => state.trips.entities);
  const thisUsersTrips = tripsState.filter((trip) => trip.user_id === user.id);

  const authorized = useSelector((state) => state.users.authorized);
  const authorizedOther = useSelector((state) => state.otherUsers.authorized);
  useEffect(() => {
    dispatch(fetchOneOtherUser(locate.state.id));
    dispatch(fetchFollows());
    dispatch(fetchTrips());
  }, []);

  if (!authorized) {
    return <h1>Loading....</h1>;
  }
  if (!authorizedOther) {
    return <h1>Loading....</h1>;
  }

  const userFollowers = followers.filter((follow) => {
    return follow.followee.id === user.id;
  });

  const userFollowing = followers.filter((follow) => {
    return follow.follower.id === user.id;
  });

  const followButtonTwo = () => {
    return userFollowers.some((el) => {
      return el.follower.username === mainUser.username;
    });
  };

  const renderTheirTrips =
    otherUsersTrips && otherUsersTrips.length >= 1 && thisUsersTrips
      ? thisUsersTrips.map((trip) => (
          <OtherUsersTripItem key={trip.id} trip={trip} />
        ))
      : null;

  const handleDelete = () => {
    const followToDelete = followers.find((follow) => {
      return (
        follow.followee.id === user.id && follow.follower.id === mainUser.id
      );
    });
    dispatch(unfollow(followToDelete.id));
  };

  const handleAdd = () => {
    const followObj = { followee_id: user.id, follower_id: mainUser.id };
    dispatch(addFollow(followObj));
  };

  return (
    <Container fluid>
      <Container className="mx-auto mt-5">
        <Row style={{ maxHeight: 200 }}>
          <Col className="w-auto">
            <h2>Name: {user.name}</h2>
            <h3>Username: {user.username}</h3>
            <hr></hr>
            <Button
              variant="turquoise"
              onClick={() => history.push(`/otherfollowers/${user.id}`)}
            >
              Followers: {userFollowers.length}
            </Button>
            <Button
              variant="turquoise"
              onClick={() => history.push(`/otherfollowing/${user.id}`)}
            >
              Following: {userFollowing.length}
            </Button>
            {user.username === mainUser.username ? null : (
              <>
                {followButtonTwo() ? (
                  <Button variant="warning" onClick={() => handleDelete()}>
                    <i class="bi bi-person-fill"></i>
                  </Button>
                ) : (
                  <Button onClick={() => handleAdd()}>
                    <i class="bi bi-person"></i>
                  </Button>
                )}{" "}
              </>
            )}
          </Col>
          <Col>
            <img
              src={user.profile_picture}
              alt="profile"
              className="h-50 rounded-circle"
            ></img>
          </Col>
        </Row>
        <hr></hr>
        <Row xs={1} sm={2} md={3} lg={4}>
          {renderTheirTrips}
        </Row>
      </Container>
    </Container>
  );
}

export default OtherUserProfile;
