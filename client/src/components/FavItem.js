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
  const mainUser = useSelector((state) => state.users.entities);

  const history = useHistory();
  const dispatch = useDispatch();

  const { id, location, photo_url, description, favorites } = fav;

  const yourFavoriteForThisPost = favorites.filter(
    (favorite) => favorite.user.id === mainUser.id && favorite.trip.id === id
  );

  return (
    <Col>
      <Card className="h-100">
        <Card.Img
          src={photo_url}
          alt="listing"
          onClick={() => history.push(`/details/${fav.id}`, fav)}
          role="button"
          className="h-75"
        />

        <Card.Body>
          <Card.Title className="text-center">{location}</Card.Title>
          <Container className="ms-2">
            <Row>
              <Col className="d-flex justify-content-center">
                <Button
                  variant="warning"
                  onClick={() =>
                    dispatch(unfavorite(yourFavoriteForThisPost[0].id))
                  }
                >
                  {" "}
                  <i class="bi bi-heart-fill"></i>
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
