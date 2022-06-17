import React from "react";
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, unfavorite } from "../features/favorites/favoritesSlice";
import Button from "react-bootstrap/Button";

function OtherUsersTripItem({ trip }) {
  const {
    id,
    location,
    photo_url,
    // user,
    // comments,
    // description,
    // user_id,
    // favorites,
  } = trip;
  // console.log("trip otherUser: ", trip);
  const history = useHistory();
  const dispatch = useDispatch();

  const mainUser = useSelector((state) => state.users.entities);
  const favoritesArray = useSelector((state) => state.favorites.entities);
  const thisUserAuth = useSelector((state) => state.otherUsers.authenticated);
  if (!thisUserAuth) {
    <h1>Loading....</h1>;
  }
  const thisUser = useSelector((state) => state.otherUsers.entities);

  const handleAddFavorite = () => {
    const favoriteObj = {
      user_id: mainUser.id,
      trip_id: trip.id,
    };
    dispatch(addFavorite(favoriteObj));
  };

  const favoritesCount = favoritesArray.filter((favorite) => {
    return (
      favorite.trip.user_id === thisUser.id && favorite.trip.id === trip.id
    );
  });

  const handleRemoveFavorite = () => {
    const favoriteToRemove = favoritesCount.find(
      (favorite) => favorite.user.id === mainUser.id
    );
    dispatch(unfavorite(favoriteToRemove.id));
  };

  const favoriteButton = favoritesCount.some(
    (el) => el.user.username === mainUser.username
  );

  return (
    <Col>
      <Card className="h-100">
        <Card.Img
          src={photo_url}
          alt="listing"
          onClick={() => history.push(`/details/${id}`, trip)}
          role="button"
          className="h-75"
        />
        <Card.Body className="text-center">
          <Card.Title className="text-center">{location}</Card.Title>
          <h5 onClick={() => history.push(`/profile/${thisUser.id}`, thisUser)}>
            {thisUser.username}
          </h5>
          <p>Favorites: {favoritesCount.length}</p>
          <Container className="ms-2">
            <Row>
              <Col className="d-flex justify-content-center">
                {!favoriteButton ? (
                  <Button variant="warning" onClick={() => handleAddFavorite()}>
                    {" "}
                    Favorite{" "}
                  </Button>
                ) : (
                  <Button
                    variant="warning"
                    onClick={() => handleRemoveFavorite()}
                  >
                    {" "}
                    Unfavorite{" "}
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

export default OtherUsersTripItem;
