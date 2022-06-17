import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import otherUsersSlice, {
  fetchOneOtherUser,
} from "../features/users/otherUsersSlice";
import {
  fetchFollows,
  addFollow,
  unfollow,
} from "../features/follows/followsSlice";
import { fetchTrips } from "../features/trips/tripsSlice";
import OtherUsersTripItem from "../components/OtherUsersTripItem";
import Button from "react-bootstrap/Button";

function OtherUserProfile() {
  let locate = useLocation();
  // const { name } = locate.state;
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.otherUsers.entities);
  const mainUser = useSelector((state) => state.users.entities);
  const followers = useSelector((state) => state.follows.entities);
  const [followData, setFollowData] = useState({
    followee_id: user.id,
    follower_id: mainUser.id,
  });
  const otherUsersTrips = useSelector(
    (state) => state.otherUsers.entities.trips
  );
  const tripsState = useSelector((state) => state.trips.entities);
  const thisUsersTrips = tripsState.filter((trip) => trip.user_id === user.id);
  console.log(
    "otherUsersTrips: ",
    otherUsersTrips,
    "vs: ",
    "tripsState: ",
    thisUsersTrips
  );
  const blah = useSelector((state) => state.trips.entities);

  const authorized = useSelector((state) => state.users.authorized);
  const authorizedOther = useSelector((state) => state.otherUsers.authorized);
  useEffect(() => {
    dispatch(fetchOneOtherUser(locate.state.id));
    dispatch(fetchFollows());
    dispatch(fetchTrips());
  }, []);
  const comparison = blah.filter((trip) => trip.user.id === user.id);
  // console.log(
  //   "otherUsersTrips: ",
  //   otherUsersTrips,
  //   "vs",
  //   "comparison: ",
  //   comparison
  // );
  // console.log(locate.state);
  // const otherUser = useSelector((state) => state.otherUsers.entities);
  // const followedState = useSelector((state) => state.follows.followed);
  if (!authorized) {
    return <h1>Loading....</h1>;
  }
  if (!authorizedOther) {
    return <h1>Loading....</h1>;
  }

  const followersArr = mainUser.followers;

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
  // console.log(locate.state);
  // const renderTheirTrips =
  //   otherUsersTrips && otherUsersTrips.length >= 1
  //     ? otherUsersTrips
  //         // comparison vs. otherUsersTrips
  //         // locate.state.trips
  //         .map((trip) => <OtherUsersTripItem key={trip.id} trip={trip} />)
  //     : null;
  const renderTheirTrips =
    otherUsersTrips && otherUsersTrips.length >= 1 && thisUsersTrips
      ? thisUsersTrips
          // comparison vs. otherUsersTrips
          // locate.state.trips
          .map((trip) => <OtherUsersTripItem key={trip.id} trip={trip} />)
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
    <div>
      OtherUserProfile
      <h1>{user.name}</h1>
      <Button onClick={() => history.push(`/otherfollowers/${user.id}`)}>
        Followers: {userFollowers.length}
      </Button>
      <Button onClick={() => history.push(`/otherfollowing/${user.id}`)}>
        Following: {userFollowing.length}
      </Button>
      {user.username === mainUser.username ? null : (
        <>
          {followButtonTwo() ? (
            <Button variant="warning" onClick={() => handleDelete()}>
              Unfollow
            </Button>
          ) : (
            <Button onClick={() => handleAdd()}>Follow</Button>
          )}{" "}
        </>
      )}
      <Row xs={1} sm={2} md={3} lg={4}>
        {renderTheirTrips}
      </Row>
    </div>
  );
}

export default OtherUserProfile;
