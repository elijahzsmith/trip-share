import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/esm/Container";

function Following() {
  const history = useHistory();
  const mainUser = useSelector((state) => state.users.entities);
  const allFollows = useSelector((state) => state.follows.entities);
  const yourFollowing = allFollows.filter((follow) => {
    return follow.follower.id === mainUser.id;
  });

  const authorized = useSelector((state) => state.users.authorized);
  if (!authorized) {
    return <h1>Loading....</h1>;
  }

  return (
    <Container fluid>
      <Container className="mx-auto mt-5">
        <h1>Your Following</h1>
        <hr></hr>
        {yourFollowing.length >= 1 ? (
          yourFollowing.map((follower) => (
            <li
              key={follower.id}
              onClick={() =>
                history.push(
                  `/profile/${follower.followee.id}`,
                  follower.followee
                )
              }
            >
              {follower.followee.name}
            </li>
          ))
        ) : (
          <h3>Not following anyone yet</h3>
        )}
      </Container>
    </Container>
  );
}
export default Following;
