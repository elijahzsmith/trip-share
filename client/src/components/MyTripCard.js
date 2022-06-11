import React from "react";
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useDispatch } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { deleteTrip } from "../features/trips/tripsSlice";

function MyTripCard({ trip }) {
  const { id } = trip;
  const dispatch = useDispatch();

  const history = useHistory();

  const handleDelete = (id) => {
    dispatch(deleteTrip(id));
  };

  return (
    <Col>
      <Card className="h-100">
        <Card.Img
          //   src={image_url}
          alt="listing"
          role="button"
          className="h-75"
          //   onClick={() => history.push(`/details/${id}`, listing)}
        />
        <Card.Body>
          <Card.Title className="text-center">{/* {what_it_is} */}</Card.Title>
          <Container className="ms-2">
            <Row>
              <Col className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  //   onClick={() => handleYourCardClick(id, listing)}
                >
                  {" "}
                  Edit Post{" "}
                </Button>
              </Col>
              <Col className="d-flex justify-content-center">
                <Button variant="warning" onClick={() => handleDelete(id)}>
                  {" "}
                  Delete Trip Post{" "}
                </Button>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
      {/* )} */}
    </Col>
  );
}

export default MyTripCard;
