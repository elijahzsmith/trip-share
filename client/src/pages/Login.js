import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";

function Login() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [error, setError] = useState([]);

  const history = useHistory();

  const user = {
    username: usernameInput,
    password: passwordInput,
  };

  const configObjPOST = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/login", configObjPOST).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          //   setUser(user);
          //   setIsAuthenticated(true);
          setError([]);
          history.push("/");
        });
      } else {
        res.json().then((json) => setError(json.error));
      }
    });
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
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPasswordInput(e.target.value)}
                value={passwordInput}
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
