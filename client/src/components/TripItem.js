import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { addFavorite, unfavorite } from "../features/favorites/favoritesSlice";
import { addComment, removeComment } from "../features/comments/commentsSlice";
function TripItem({ trip, allComments }) {
  const [showForm, setShowForm] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const mainUser = useSelector((state) => state.users.entities);

  const favoritesArray = useSelector((state) => state.favorites.entities);

  const [commentData, setCommentData] = useState({
    content: "",
    user_id: "",
    trip_id: trip.id,
  });

  if (!mainUser) {
    return <h1>Loading...</h1>;
  }

  const { id, location, photo_url, user } = trip;

  const filteredComments = allComments.filter((comment) => {
    return comment.trip.id === id;
  });

  const handleAddFavorite = () => {
    const favoriteObj = {
      user_id: mainUser.id,
      trip_id: trip.id,
    };
    dispatch(addFavorite(favoriteObj));
  };

  const handleChange = (e) => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value });
  };
  const handleAddComment = (e) => {
    e.preventDefault();
    const commentObj = {
      content: commentData.content,
      user_id: mainUser.id,
      trip_id: trip.id,
    };
    dispatch(addComment(commentObj));
    setShowForm(false);
  };

  const favoritesCount = favoritesArray.filter((favorite) => {
    return favorite.trip.id === trip.id;
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
          onClick={() => history.push(`/details/${trip.id}`, trip)}
          role="button"
          className="h-75"
        />
        <Card.Body>
          <Card.Title className="text-center">{location}</Card.Title>
          <h6 onClick={() => history.push(`/profile/${user.id}`, user)}>
            {mainUser
              ? mainUser.username === user.username
                ? null
                : user.username
              : null}
          </h6>
          <h6
            onClick={() => setShowFavorites((showFavorites) => !showFavorites)}
          >
            Favorites: {favoritesCount.length}
          </h6>

          {showFavorites && favoritesCount.length >= 1
            ? favoritesCount.map((favorite) => {
                return (
                  <div key={favorite.id}>
                    {favorite.user.id !== mainUser.id ? (
                      <li>
                        <strong
                          onClick={() =>
                            history.push(
                              `/profile/${favorite.user.id}`,
                              favorite.user
                            )
                          }
                        >
                          {favorite.user.username}
                        </strong>
                      </li>
                    ) : (
                      <li>
                        <strong onClick={() => history.push(`/profile`)}>
                          {favorite.user.username}
                        </strong>
                      </li>
                    )}
                  </div>
                );
              })
            : null}

          {showForm ? (
            <form onSubmit={(e) => handleAddComment(e)}>
              <input
                type="text"
                placeholder="comment..."
                name="content"
                onChange={(e) => handleChange(e)}
              ></input>
              <Button type="submit" variant="turquoise">
                Post Comment <i className="bi bi-chat-text"></i>
              </Button>
            </form>
          ) : (
            <>
              <h6
                onClick={() => setShowComments((showComments) => !showComments)}
              >
                Comments:{" "}
                {filteredComments ? `${filteredComments.length}` : "Loading"}
              </h6>
              {showComments && filteredComments.length >= 1
                ? filteredComments.map((comment) => {
                    return (
                      <div key={comment.id}>
                        <li>
                          {comment.user.id !== mainUser.id ? (
                            <strong
                              onClick={() =>
                                history.push(
                                  `/profile/${comment.user.id}`,
                                  comment.user
                                )
                              }
                            >
                              {comment.user.username}:
                            </strong>
                          ) : (
                            <strong onClick={() => history.push(`/profile`)}>
                              {comment.user.username}:
                            </strong>
                          )}
                          {comment.content}...
                          {comment.user.id === mainUser.id ? (
                            <button
                              key={comment.id}
                              onClick={() =>
                                dispatch(removeComment(comment.id))
                              }
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          ) : null}
                        </li>
                      </div>
                    );
                  })
                : null}
            </>
          )}
          <Container className="ms-2">
            <Row>
              <Col className="d-flex justify-content-center">
                {mainUser.username === user.username ? (
                  <h5 onClick={() => history.push("/mytrips")}>Your Post</h5>
                ) : showForm ? (
                  <Button onClick={() => setShowForm((showForm) => !showForm)}>
                    Close Comment Form
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="turquoise"
                      onClick={() => setShowForm((showForm) => !showForm)}
                    >
                      Comment<i className="bi bi-chat-text"></i>
                    </Button>
                    {!favoriteButton ? (
                      <Button
                        variant="warning"
                        onClick={() => handleAddFavorite()}
                      >
                        {" "}
                        Favorite<i className="bi bi-heart"></i>
                      </Button>
                    ) : (
                      <Button
                        variant="warning"
                        onClick={() => handleRemoveFavorite()}
                      >
                        {" "}
                        Unfavorite<i className="bi bi-heart-fill"></i>{" "}
                      </Button>
                    )}
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

export default TripItem;
