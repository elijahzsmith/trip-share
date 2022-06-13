import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function OtherFollowers() {
  const history = useHistory();
  const followers = useSelector((state) => state.otherUsers.entities.followers);
  const mainUser = useSelector((state) => state.users.entities.followees);

  const user = useSelector((state) => state.otherUsers.entities);

  const authorized = useSelector((state) => state.users.authorized);
  if (!authorized) {
    return <h1>Loading....</h1>;
  }

  return (
    <div>
      {user.name} has: {followers.length} followers
      {followers.map((follower) => {
        return follower.username === mainUser.username ? (
          <li
            key={follower.id}
            onClick={() => history.push(`/profile/${follower.id}`, follower)}
          >
            {follower.name}
          </li>
        ) : (
          <li key={follower.id} onClick={() => history.push("/profile")}>
            {follower.name}
          </li>
        );
      })}
    </div>
  );
}
export default OtherFollowers;
