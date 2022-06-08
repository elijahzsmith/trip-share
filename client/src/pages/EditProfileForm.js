import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";

function EditProfileForm() {
  const [formData, setFormData] = useState({
    // name: user.name,
    // username: user.username,
    // age: user.age,
  });

  const history = useHistory();

  //   const { name, username, age } = user;

  const handleChange = (e) => {
    const key = e.target.name;
    setFormData({
      ...formData,
      [key]: e.target.value,
    });
  };

  const configObjPATCH = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  };

  const handleEditProfile = (e) => {
    e.preventDefault();
    // fetch(`/users/${user.id}`, configObjPATCH)
    //   .then(res => res.json())
    //   .then(data => {
    //     // setUser(data)
    //     history.push('/profile')
    //   })
  };

  return (
    <Container fluid>
      <Container className="mx-auto mt-5">
        <Row className="text-center">
          <h1>Edit Profile</h1>
        </Row>

        <Row className="mb-5">
          <Form onSubmit={(e) => handleEditProfile(e)}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                // placeholder={name}
                onChange={handleChange}
                value={formData.name}
                name="name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                // placeholder={username}
                onChange={handleChange}
                value={formData.username}
                name="username"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                // placeholder={age}
                onChange={handleChange}
                value={formData.age}
                name="age"
              />
            </Form.Group>

            <Row className="d-flex justify-content-center mt-4">
              <Button variant="primary" type="submit" className="w-25">
                Save Changes
              </Button>
            </Row>
          </Form>
        </Row>

        <Row>
          <Button
            className="w-25 mx-auto"
            variant="warning"
            onClick={() => history.push("/profile")}
          >
            Exit Edit Form
          </Button>
        </Row>
      </Container>
    </Container>
  );
}

export default EditProfileForm;
