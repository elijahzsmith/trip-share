import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneOtherUser } from "../features/users/otherUsersSlice";
import {
  fetchFollows,
  addFollow,
  unfollow,
} from "../features/follows/followsSlice";
import OtherUsersTripItem from "../components/OtherUsersTripItem";
import Button from "react-bootstrap/Button";

function OtherUserProfile() {
  let locate = useLocation();
  const { name } = locate.state;
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

  const authorized = useSelector((state) => state.users.authorized);
  const authorizedOther = useSelector((state) => state.otherUsers.authorized);
  useEffect(() => {
    dispatch(fetchOneOtherUser(locate.state.id));
    dispatch(fetchFollows(locate.state.id));
  }, []);
  const otherUser = useSelector((state) => state.otherUsers.entities);
  if (!authorized) {
    return <h1>Loading....</h1>;
  }
  if (!authorizedOther) {
    return <h1>Loading....</h1>;
  }

  const followersArr = mainUser.followers;

  const followButton = () => {
    return followersArr.some((el) => {
      return el.username === user.username;
    });
  };

  const renderTheirTrips =
    otherUsersTrips && otherUsersTrips.length >= 1
      ? otherUsersTrips.map((trip) => (
          <OtherUsersTripItem key={trip.id} trip={trip} />
        ))
      : null;

  const handleDelete = () => {
    const followToDelete = followers.find(
      (follow) =>
        follow.followee.id === otherUser.id &&
        follow.follower.id === mainUser.id
    );
    dispatch(unfollow(followToDelete.id));
  };

  const handleAdd = () => {
    setFollowData({ followee_id: user.id, follower_id: mainUser.id });
    console.log(
      "user: ",
      user,
      "mainUser: ",
      mainUser,
      "followdata1: ",
      followData
    );
    // dispatch(addFollow(followData));
    finishAdd();
  };
  const finishAdd = () => {
    // setFollowData({ followee_id: mainUser.id, follower_id: user.id });
    console.log("followdata2: ", followData);
    dispatch(addFollow(followData));
  };

  return (
    <div>
      OtherUserProfile
      <h1>{name}</h1>
      <Button onClick={() => history.push(`/otherfollowers/${user.id}`)}>
        Followers: {user.followers.length}
      </Button>
      <Button onClick={() => history.push(`/otherfollowing/${user.id}`)}>
        Following: {user.followees.length}
      </Button>
      {
        user.username === mainUser.username ? null : (
          <>
            {followButton() ? (
              <Button variant="warning" onClick={() => handleDelete()}>
                Unfollow
              </Button>
            ) : (
              <Button onClick={() => handleAdd()}>Follow</Button>
            )}{" "}
          </>
        )
        // <Button>{followButton() ? "Unfollow" : "Follow"}</Button>
      }
      <Row xs={1} sm={2} md={3} lg={4}>
        {renderTheirTrips}
      </Row>
    </div>
  );
}

export default OtherUserProfile;
