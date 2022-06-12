import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// expirement
import { fetchOneOtherUser } from "../features/users/otherUsersSlice";

function OtherFollowers() {
  const history = useHistory();
  const followers = useSelector((state) => state.otherUsers.entities.followers);
  const user = useSelector((state) => state.otherUsers.entities);

  // expirement
  const dispatch = useDispatch();

  // console.log(followers);
  const authorized = useSelector((state) => state.users.authorized);
  if (!authorized) {
    return <h1>Loading....</h1>;
  }

  return (
    <div>
      {user.name} has: {followers.length} followers
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
export default OtherFollowers;
