import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneOtherUser } from "../features/users/otherUsersSlice";
import { addFavorite } from "../features/favorites/favoritesSlice";
import Button from "react-bootstrap/Button";

function FavItem({ trip }) {
  const [iconState, setIconState] = useState(null);

  const mainUser = useSelector((state) => state.users.entities);
  const { id, location, photo_url, description, user_id, favorites } = trip;

  const [favoriteData, setFavoriteData] = useState({
    user_id: mainUser.id,
    trip_id: trip.id,
  });
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOneOtherUser(user_id));
  }, []);
  const thisUserAuth = useSelector((state) => state.otherUsers.authenticated);
  if (!thisUserAuth) {
    <h1>Loading....</h1>;
  }
  const thisUser = useSelector((state) => state.otherUsers.entities);

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
            // onClick={() => handleCardClick(id, fav.listing)}
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
          onClick={() => history.push(`/details/${id}`, trip)}
          role="button"
          className="h-75"
        />
        {/* {renderIcon()} */}
        <Card.Body className="text-center">
          <Card.Title className="text-center">{location}</Card.Title>
          <h5 onClick={() => history.push(`/profile/${thisUser.id}`, thisUser)}>
            {thisUser.username}
          </h5>
          <p>Favorites: {favorites.length}</p>
          <Container className="ms-2">
            <Row>
              <Col className="d-flex justify-content-center">
                <Button variant="warning" onClick={() => handleAddFavorite()}>
                  {" "}
                  favorite{" "}
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
