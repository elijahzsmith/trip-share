import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import { useSelector, useDispatch } from "react-redux";
import { postTrip } from "../features/trips/tripsSlice";

function PostTripForm() {
  const [errors, setErrors] = useState([]);
  const user = useSelector((state) => state.users.entities);
  const userAuth = useSelector((state) => state.users.authenticated);

  const history = useHistory();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    location: "",
    photo_url: "",
    description: "",
  });

  const handleChange = (e) => {
    if (!userAuth) {
      <h1>Loading...</h1>;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleAddTrip = (e) => {
    e.preventDefault();
    if (!userAuth) {
      <h1>Loading...</h1>;
    }
    dispatch(postTrip({ ...formData, user_id: user.id }));
  };

  return (
    <Container fluid>
      <Container className="mx-auto mt-5">
        <Row className="text-center">
          <h1>Post A Trip</h1>
        </Row>

        <Row className="mb-5">
          <Form onSubmit={(e) => handleAddTrip(e)}>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                placeholder="Location..."
                value={formData.location}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="photo_url"
                placeholder="Image Url..."
                value={formData.photo_url}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Description..."
                value={formData.description}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>

            {errors ? (
              <Row className="text-danger text-center mb-2">
                {errors.map((err, i) => (
                  <strong key={i}>{err}</strong>
                ))}
              </Row>
            ) : null}

            <Row className="d-flex justify-content-center mb-2">
              <Button variant="primary" type="submit" className="w-25">
                Post Trip
              </Button>
            </Row>
          </Form>
        </Row>
      </Container>
    </Container>
  );
}

export default PostTripForm;
