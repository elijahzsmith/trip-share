import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import { useSelector, useDispatch } from "react-redux";
import { editTrip } from "../features/trips/tripsSlice";

function EditTripPostForm() {
  const [errors, setErrors] = useState([]);
  let locate = useLocation();
  let thisTrip = locate.state;
  const user = useSelector((state) => state.users.entities);

  const history = useHistory();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    location: thisTrip.location,
    photo_url: thisTrip.photo_url,
    description: thisTrip.description,
    user_id: thisTrip.user_id,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleEditPost = (e) => {
    e.preventDefault();
    // dispatch(editTrip(formData, thisTrip.id));
  };

  return (
    <Container fluid>
      <Container className="mx-auto mt-5">
        <Row className="text-center">
          <h1>Edit Post</h1>
        </Row>

        <Row className="mb-5">
          <Form onSubmit={(e) => handleEditPost(e)}>
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
                name="image_url"
                placeholder="Image Url..."
                value={formData.photo_url}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
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
                Save Changes
              </Button>
            </Row>
          </Form>
        </Row>
      </Container>
    </Container>
  );
}

export default EditTripPostForm;
