import React from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import SignupLoginLanding from "../components/SignupLoginLanding";

function LandingPage() {
  const history = useHistory();
  return (
    <div className="d-flex flex-end">
      <Col className="landing-page-container">
        <h1>Welcome to TripShare</h1>
      </Col>
      <Col className="landing-page-container">
        <SignupLoginLanding />
      </Col>
    </div>
  );
}

export default LandingPage;
