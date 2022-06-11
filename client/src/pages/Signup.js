import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import { createSignup } from "../features/users/usersSlice";

function Signup() {
  const [error, setError] = useState([]);
  const [signUpData, setSignUpData] = useState({
    name: "",
    password: "",
  });

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createSignup(signUpData));
    setSignUpData({
      name: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    const key = e.target.name;
    setSignUpData({
      ...signUpData,
      [key]: e.target.value,
    });
  };

  return (
    <Container fluid>
      <Container className="mx-auto mt-5">
        <Row className="text-center">
          <h2>TripShare</h2>
          <h4>A Travel Network</h4>
          <h1>Sign Up</h1>
        </Row>

        <Row className="mb-5">
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name..."
                onChange={handleChange}
                // value={usernameInput}
                name="name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password..."
                onChange={handleChange}
                value={signUpData.password}
                name="password"
              />
            </Form.Group>

            <Row className="d-flex justify-content-center mb-2">
              <Button variant="primary" type="submit" className="w-25">
                Create Account
              </Button>
            </Row>

            {error ? (
              <Row className="text-danger text-center">
                <strong>{error}</strong>
              </Row>
            ) : null}
          </Form>
        </Row>

        <Row className="text-center">
          <h4>Already have an account?</h4>
        </Row>

        <Row>
          <Button
            onClick={() => history.push("/login")}
            className="w-25 mx-auto"
          >
            Login
          </Button>
        </Row>
      </Container>
    </Container>
  );
}

export default Signup;
