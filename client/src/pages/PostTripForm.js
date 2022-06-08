import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";

function PostListingForm() {
  const [errors, setErrors] = useState([]);

  const history = useHistory();

  const [formData, setFormData] = useState({
    location: "",
    image_url: "",
    what_it_is: "",
    category: "",
    description: "",
    month: "",
    day: "",
    year: "",
    time: "",
    // user_id: user.id,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const configObjPOST = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      location: formData.location,
      image_url: formData.image_url,
      what_it_is: formData.what_it_is,
      category: formData.category,
      description: formData.description,
      end_time: `${formData.year}-${formData.month}-${formData.day}T${formData.time}:00`,
      //   user_id: user.id,
    }),
  };

  const handleAddListing = (e) => {
    e.preventDefault();
    fetch("/listings", configObjPOST).then((res) => {
      if (res.ok) {
        res.json().then((newListing) => {
          setFormData({
            location: "",
            image_url: "",
            what_it_is: "",
            category: "",
            description: "",
            end_time: "",
            // user_id: user.id,
          });
          //   handleCreateTimer(newListing.id);
          alert("Post Successful");
          history.push("/yourdonations");
        });
      } else {
        res.json().then((err) => setErrors(err.errors));
      }
    });
  };

  return (
    <Container fluid>
      <Container className="mx-auto mt-5">
        <Row className="text-center">
          <h1>Post A Donation</h1>
        </Row>

        <Row className="mb-5">
          <Form onSubmit={(e) => handleAddListing(e)}>
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
                value={formData.image_url}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>What it is</Form.Label>
              <Form.Control
                type="text"
                name="what_it_is"
                placeholder="What it is..."
                value={formData.what_it_is}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                placeholder="Category..."
                value={formData.category}
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

            <Row>
              <h3>Select Raffle End Time</h3>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Month</Form.Label>
                  <Form.Select
                    name="month"
                    value={formData.month}
                    onChange={(e) => {
                      //   setSelectedMonth(e.target.value);
                      handleChange(e);
                    }}
                  >
                    {/* {renderMonths()} */}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Day</Form.Label>
                  <Form.Select
                    name="day"
                    value={formData.day}
                    onChange={(e) => handleChange(e)}
                  >
                    {/* {renderDays()} */}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Year</Form.Label>
                  <Form.Select
                    name="year"
                    value={formData.year}
                    onChange={(e) => handleChange(e)}
                  >
                    {/* {renderYears()} */}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Time</Form.Label>
                  <Form.Select
                    name="time"
                    value={formData.time}
                    onChange={(e) => handleChange(e)}
                  >
                    {/* {renderTimes()} */}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {errors ? (
              <Row className="text-danger text-center mb-2">
                {errors.map((err, i) => (
                  <strong key={i}>{err}</strong>
                ))}
              </Row>
            ) : null}

            <Row className="d-flex justify-content-center mb-2">
              <Button variant="primary" type="submit" className="w-25">
                Post Listing
              </Button>
            </Row>
          </Form>
        </Row>
      </Container>
    </Container>
  );
}

export default PostListingForm;
