import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import { handleUpdate } from "../features/users/usersSlice";

function EditProfileForm() {
  const user = useSelector((state) => state.users.entities);
  const history = useHistory();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    id: user.id,
    name: user.name,
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
