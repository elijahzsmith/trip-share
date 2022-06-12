import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// expirement
import { fetchOneOtherUser } from "../features/users/otherUsersSlice";

function OtherFollowing() {
  const history = useHistory();
  const followees = useSelector((state) => state.otherUsers.entities.followees);
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
      {user.name}'s Following: {followees.length}
      {followees.map((followee) => (
        <li
          key={followee.id}
          onClick={() => history.push(`/profile/${followee.id}`, followee)}
        >
          {followee.name}
        </li>
      ))}
    </div>
  );
}
export default OtherFollowing;
