import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function Followers() {
  const history = useHistory();
  const followers = useSelector((state) => state.users.entities.followers);
  console.log(followers);

  return (
    <div>
      Followers
      {followers.map((follower) => (
        <li
          key={follower.id}
          onClick={() => history.push(`/profile/${follower.id}`, follower)}
        >
          {follower.name}
        </li>
      ))}
    </div>
  );
}

export default Followers;
