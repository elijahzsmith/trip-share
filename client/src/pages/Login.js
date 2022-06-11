import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import { fetchLogin } from "../features/users/usersSlice";

function Login() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [error, setError] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();

  const user = {
    name: usernameInput,
    password: passwordInput,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchLogin(user));
    history.push("/");
  };

  return (
    <Container fluid>
      <Container className="mx-auto mt-5">
        <Row className="text-center">
          <h2>Welcome Back</h2>
          <h4>TripShare</h4>
          <h1>Login</h1>
        </Row>

        <Row className="mb-5">
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                onChange={(e) => setUsernameInput(e.target.value)}
                value={usernameInput}
                name="name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPasswordInput(e.target.value)}
                value={passwordInput}
                name="password"
              />
            </Form.Group>
            <Row className="d-flex justify-content-center mb-2">
              <Button variant="primary" type="submit" className="w-25">
                Login
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
          <h4>Don't have an account?</h4>
        </Row>

        <Row>
          <Button
            onClick={() => history.push("/signup")}
            className="w-25 mx-auto"
          >
            Sign Up
          </Button>
        </Row>
      </Container>
    </Container>
  );
}

export default Login;
