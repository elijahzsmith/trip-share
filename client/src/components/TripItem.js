import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { addFavorite } from "../features/favorites/favoritesSlice";
import { addComment } from "../features/comments/commentsSlice";

function FavItem({ trip }) {
  const [iconState, setIconState] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const mainUser = useSelector((state) => state.users.entities);
  const [favoriteData, setFavoriteData] = useState({
    user_id: "",
    trip_id: trip.id,
  });
  const [commentData, setCommentData] = useState({
    content: "",
    user_id: "",
    trip_id: trip.id,
  });
  if (!mainUser) {
    return <h1>Loading...</h1>;
  }

  const { location, photo_url, description, user, favorites, comments } = trip;

  const handleAddFavorite = () => {
    setFavoriteData({
      // set mainUser.id in the users slice instead??????
      user_id: mainUser.id,
      trip_id: trip.id,
    });
    dispatch(addFavorite(favoriteData));
  };

  const handleChange = (e) => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value });
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    setCommentData({
      content: e.target.value,
      user_id: mainUser.id,
      trip_id: trip.id,
    });
    dispatch(addComment(commentData));
    setShowForm(false);
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
            {mainUser
              ? mainUser.username === user.username
                ? null
                : user.username
              : null}
          </h6>
          <p onClick={() => setShowComments(false)}>
            Favorites: {favorites.length}
          </p>
          {showForm ? (
            <form onSubmit={(e) => handleAddComment(e)}>
              <input
                type="text"
                placeholder="comment..."
                name="content"
                onChange={(e) => handleChange(e)}
              ></input>
              <button type="submit">Post Comment</button>
            </form>
          ) : (
            <>
              <p
                onClick={() => setShowComments((showComments) => !showComments)}
              >
                Comments: {comments.length}
              </p>
              {showComments && comments.length >= 1
                ? comments.map((comment) => {
                    return (
                      <li key={comment.id}>
                        {comment.content.substring(0, 8)}...
                      </li>
                    );
                  })
                : null}
            </>
          )}
          <Container className="ms-2">
            <Row>
              <Col className="d-flex justify-content-center">
                {mainUser.username === user.username ? null : showForm ? (
                  <Button onClick={() => setShowForm((showForm) => !showForm)}>
                    Close Comment Form
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="primary"
                      onClick={() => setShowForm((showForm) => !showForm)}
                    >
                      comment
                    </Button>
                    <Button
                      variant="warning"
                      onClick={() => handleAddFavorite()}
                    >
                      favorite
                    </Button>
                  </>
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
