import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/esm/Container";

function OtherFollowing() {
  const history = useHistory();
  const followees = useSelector((state) => state.otherUsers.entities.followees);
  const user = useSelector((state) => state.otherUsers.entities);
  const mainUser = useSelector((state) => state.users.entities);

  const authorized = useSelector((state) => state.users.authorized);
  if (!authorized) {
    return <h1>Loading....</h1>;
  }

  const numberOfFollowing = () => {
    if (followees.length > 1) {
      return `${followees.length} followers`;
    } else if (followees.length === 1) {
      return `${followees.length} follower`;
    } else {
      return `no one`;
    }
  };

  return (
    <Container fluid>
      <Container className="mx-auto mt-5">
        <h1>
          {user.name}'s Following: {numberOfFollowing()}
        </h1>
        <hr></hr>
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
      </Container>
    </Container>
  );
}
export default OtherFollowing;
