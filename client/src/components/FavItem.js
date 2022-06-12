import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { unfavorite } from "../features/favorites/favoritesSlice";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function FavItem({ fav }) {
  //   const [iconState, setIconState] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const { location, photo_url, description } = fav.trip;

  //   function renderIcon() {
  //     switch (iconState) {
  //       case "Ongoing": {
  //         return (
  //           <Card.ImgOverlay
  //             className="d-flex flex-column align-items-end h-75"
  //             // onClick={() => handleCardClick(id, fav.listing)}
  //             role="button"
  //           >
  //             <div className="mt-0 bg-white rounded p-1">
  //               <i className="bi bi-hourglass-split text-yellow h3"></i>
  //             </div>
  //           </Card.ImgOverlay>
  //         );
  //       }
  //       default: {
  //         return null;
  //       }
  //     }
  //   }

  return (
    <Col>
      <Card className="h-100">
        <Card.Img
          src={photo_url}
          alt="listing"
          //   onClick={() => handleCardClick(id, fav.listing)}
          role="button"
          className="h-75"
        />
        {/* {renderIcon()} */}
        <Card.Body>
          <Card.Title className="text-center">{location}</Card.Title>
          {/* <p onClick={() => history.push(`/profile/${user.id}`, user)}>
            {user.username}
          </p> */}
          <Container className="ms-2">
            <Row>
              <Col className="d-flex justify-content-center">
                <Button
                  variant="warning"
                  onClick={() => dispatch(unfavorite(fav.trip.id))}
                >
                  {" "}
                  Remove Favorite{" "}
                </Button>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default FavItem;
