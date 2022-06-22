import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// expirement
import { fetchOneOtherUser } from "../features/users/otherUsersSlice";
import Container from "react-bootstrap/esm/Container";

function Followers() {
  const history = useHistory();
  const followers = useSelector((state) => state.users.entities.followers);
  const mainUser = useSelector((state) => state.users.entities);
  const allFollows = useSelector((state) => state.follows.entities);
  const yourFollowers = allFollows.filter((follow) => {
    return follow.followee.id === mainUser.id;
  });

  console.log(followers, "vs", yourFollowers);

  // expirement
  const dispatch = useDispatch();

  // console.log(followers);
  const authorized = useSelector((state) => state.users.authorized);
  if (!authorized) {
    return <h1>Loading....</h1>;
  }

  return (
    <Container fluid>
      <Container className="mx-auto mt-5">
        <h1>Your Followers</h1>
        <hr></hr>
        {/* {followers.map((follower) => ( */}
        {/* { */}
        {yourFollowers.length >= 1 ? (
          yourFollowers.map((follower) => (
            <li
              key={follower.id}
              onClick={() =>
                history.push(
                  `/profile/${follower.follower.id}`,
                  follower.follower
                )
              }
            >
              {follower.follower.name}
            </li>
          ))
        ) : (
          <h3>No followers yet</h3>
        )}
      </Container>
    </Container>
  );
}

export default Followers;
