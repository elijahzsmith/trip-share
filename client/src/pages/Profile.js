import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleAuth } from "../features/users/usersSlice";

function Profile() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleAuth());
  }, []);
  const history = useHistory();

  const currUser = useSelector((state) => state.users.entities);
  console.log(currUser);

  return (
    <Container fluid>
      <Container className="mx-auto mt-5">
        <h1>Account Details</h1>
        <hr></hr>
        <h2>Name: {currUser.name}</h2>
        <h3>Username: "username"</h3>
        <h6>Age: "age"</h6>
        <Button className="me-2" onClick={() => history.push("/editprofile")}>
          Edit Profile
        </Button>
        <Button className="me-2" onClick={() => history.push("/mytrips")}>
          Your Trip Posts
        </Button>
        <Button className="me-2" onClick={() => history.push("/favorites")}>
          Your Favorites
        </Button>
        <Button className="me-2" onClick={() => history.push("/following")}>
          Following
        </Button>
      </Container>
    </Container>
  );
}

export default Profile;
