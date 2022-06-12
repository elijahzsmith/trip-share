import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// expirement
import { fetchOneOtherUser } from "../features/users/otherUsersSlice";

function Followers() {
  const history = useHistory();
  const followers = useSelector((state) => state.users.entities.followers);

  // expirement
  const dispatch = useDispatch();

  // console.log(followers);
  const authorized = useSelector((state) => state.users.authorized);
  if (!authorized) {
    return <h1>Loading....</h1>;
  }

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
