import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { unfavorite } from "../features/favorites/favoritesSlice";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function SignupLoginLanding() {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <Col className="d-flex justify-content-center">
      <Card className="h-100">
        <Card.Body>
          <Card.Title className="text-center">{}</Card.Title>
          <Container className="ms-2">
            <Row>
              <Col className="d-flex flex-column justify-content-center">
                <Button
                  variant="turquoise"
                  onClick={() => history.push("/login")}
                >
                  Login
                </Button>
                <Button
                  onClick={() => history.push("/signup")}
                >
                  Signup
                </Button>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default SignupLoginLanding;
