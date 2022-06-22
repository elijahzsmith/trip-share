import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import { handleUpdate } from "../features/users/usersSlice";

function EditProfileForm() {
  const user = useSelector((state) => state.users.entities);
  const errors = useSelector((state) => state.users.errors);
  const authorized = useSelector((state) => state.users.authorized);
  const history = useHistory();
  const dispatch = useDispatch();
  console.log("errors: TEST", errors);

  // useEffect(() => {
  //   if (!errors) {
  //     history.push("/profile");
  //   }
  // }, [errors]);

  // useEffect(() => {
  //   if (!errors) {
  //     history.push("/");
  //   }
  // }, [authorized, history, errors]);

  const [formData, setFormData] = useState({
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    age: user.age,
    profile_picture: user.profile_picture,
  });

  const handleChange = (e) => {
    const key = e.target.name;
    setFormData({
      ...formData,
      [key]: e.target.value,
    });
  };

  const handleEditProfile = (e) => {
    e.preventDefault();
    // console.log(formData);
    dispatch(handleUpdate(formData, history));
    history.push("/profile");
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
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                // placeholder={username}
                onChange={handleChange}
                value={formData.email}
                name="email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                // placeholder={name}
                onChange={handleChange}
                value={formData.age}
                name="age"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="text"
                // placeholder={name}
                onChange={handleChange}
                value={formData.profile_picture}
                name="profile_picture"
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
        {/* {errors.length > 0 ? ( */}
        {errors.errors ? (
          <Row className="text-danger text-center">
            {errors.errors.map((error) => {
              console.log(errors, "and", error);
              return (
                <p>
                  <strong>{error}</strong>
                </p>
              );
            })}
          </Row>
        ) : null}
        {/* {errors.length > 0 ? (
          <Row className="text-danger text-center">
            {errors.map((error) => (
              <p key={error.error}>
                <strong>{error.error}</strong>
              </p>
            ))}
          </Row>
        ) : null} */}
      </Container>
    </Container>
  );
}

export default EditProfileForm;
