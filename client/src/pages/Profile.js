import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import { useHistory } from "react-router-dom";

function Profile() {
  const history = useHistory();

  //   const { name, age, username } = user;

  return (
    <Container fluid>
      <Container className="mx-auto mt-5">
        <h1>Account Details</h1>
        <hr></hr>
        <h2>Name: "name"</h2>
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
