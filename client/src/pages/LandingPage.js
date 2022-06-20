import React from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

function LandingPage() {
  const history = useHistory();
  return (
    <div>
      <h1>Landing Page</h1>
      <Button onClick={() => history.push("/login")}>Login</Button>
    </div>
  );
}

export default LandingPage;
