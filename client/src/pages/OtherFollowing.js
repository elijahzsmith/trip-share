import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function OtherFollowing() {
  const history = useHistory();
  const followees = useSelector((state) => state.otherUsers.entities.followees);
  const user = useSelector((state) => state.otherUsers.entities);
  const mainUser = useSelector((state) => state.users.entities);

  const authorized = useSelector((state) => state.users.authorized);
  if (!authorized) {
    return <h1>Loading....</h1>;
  }

  return (
    <div>
      <h1>
        {user.name}'s Following: {followees.length}
      </h1>
      {followees.map((followee) => {
        return followee.username !== mainUser.username ? (
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
