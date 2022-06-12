import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneOtherUser } from "../features/users/otherUsersSlice";
import { fetchFollows, addFollow } from "../features/follows/followsSlice";
import OtherUsersTripItem from "../components/OtherUsersTripItem";
import Button from "react-bootstrap/Button";

function OtherUserProfile() {
  let locate = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { name } = locate.state;
  const user = useSelector((state) => state.otherUsers.entities);
  const mainUser = useSelector((state) => state.users.entities);
  const [followData, setFollowData] = useState({
    follower_id: mainUser.id,
    followee_id: user.id,
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
  if (!authorized) {
    return <h1>Loading....</h1>;
  }
  if (!authorizedOther) {
    return <h1>Loading....</h1>;
  }

  const followersArr = mainUser.followers;
  console.log("followers: ", followersArr);

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

  return (
    <div>
      OtherUserProfile
      <h1>{name}</h1>
      <button onClick={() => history.push(`/otherfollowers/${user.id}`)}>
        Followers: {user.followers.length}
      </button>
      <button onClick={() => history.push(`/otherfollowing/${user.id}`)}>
        Following: {user.followees.length}
      </button>
      {
        user.username === mainUser.username ? null : (
          <>
            {followButton() ? (
              <Button>Unfollow</Button>
            ) : (
              <Button onClick={() => dispatch(addFollow(followData))}>
                Follow
              </Button>
            )}{" "}
          </>
        )
        // <Button>{followButton() ? "Unfollow" : "Follow"}</Button>
      }
      {renderTheirTrips}
    </div>
  );
}

export default OtherUserProfile;
