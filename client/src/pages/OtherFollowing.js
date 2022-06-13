import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function OtherFollowing() {
  const history = useHistory();
  const followees = useSelector((state) => state.otherUsers.entities.followees);
  const user = useSelector((state) => state.otherUsers.entities);
  const mainUser = useSelector((state) => state.users.entities.followees);

  const authorized = useSelector((state) => state.users.authorized);
  if (!authorized) {
    return <h1>Loading....</h1>;
  }

  return (
    <div>
      {user.name}'s Following: {followees.length}
      {followees.map((followee) => {
        return followee.username === mainUser.username ? (
          <li
            key={followee.id}
            onClick={() => history.push(`/profile/${followee.id}`, followee)}
          >
            {followee.name}
          </li>
        ) : (
          <li key={followee.id} onClick={() => history.push("/profile")}>
            {followee.name}
          </li>
        );
      })}
    </div>
  );
}
export default OtherFollowing;
