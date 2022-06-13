import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { addFavorite } from "../features/favorites/favoritesSlice";

function FavItem({ trip }) {
  // console.log(trip);
  const [iconState, setIconState] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const mainUser = useSelector((state) => state.users.entities);
  const [favoriteData, setFavoriteData] = useState({
    user_id: "",
    trip_id: trip.id,
  });
  if (!mainUser) {
    return <h1>Loading...</h1>;
  }
  // setFavoriteData({
  //   user_id: mainUser.id,
  //   trip_id: trip.id,
  // });

  const { location, photo_url, description, user, favorites } = trip;
  // console.log(favorites);

  const handleAddFavorite = () => {
    setFavoriteData({
      user_id: mainUser.id,
      trip_id: trip.id,
    });
    dispatch(addFavorite(favoriteData));
  };

  function renderIcon() {
    switch (iconState) {
      case "Ongoing": {
        return (
          <Card.ImgOverlay
            className="d-flex flex-column align-items-end h-75"
            onClick={() => history.push(`/details/${trip.id}`, trip)}
            role="button"
          >
            <div className="mt-0 bg-white rounded p-1">
              <i className="bi bi-hourglass-split text-yellow h3"></i>
            </div>
          </Card.ImgOverlay>
        );
      }
      default: {
        return null;
      }
    }
  }

  return (
    <Col>
      <Card className="h-100">
        <Card.Img
          src={photo_url}
          alt="listing"
          onClick={() => history.push(`/details/${trip.id}`, trip)}
          role="button"
          className="h-75"
        />
        {renderIcon()}
        <Card.Body>
          <Card.Title className="text-center">{location}</Card.Title>
          <h6 onClick={() => history.push(`/profile/${user.id}`, user)}>
            {mainUser.username === user.username ? null : user.username}
          </h6>
          <p>Favorites: {favorites.length}</p>
          <Container className="ms-2">
            <Row>
              <Col className="d-flex justify-content-center">
                {mainUser.username === user.username ? null : (
                  <Button variant="warning" onClick={() => handleAddFavorite()}>
                    favorite
                  </Button>
                )}
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default FavItem;
