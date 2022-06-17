import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import {
  addFavorite,
  unfavorite,
  allComments,
} from "../features/favorites/favoritesSlice";
import {
  fetchComments,
  addComment,
  removeComment,
} from "../features/comments/commentsSlice";

function FavItem({ trip, allComments }) {
  const [showForm, setShowForm] = useState(false);
  const [showComments, setShowComments] = useState(false);
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

  const {
    id,
    location,
    photo_url,
    description,
    user,
    favorites,
    comments,
    user_id,
  } = trip;

  const filteredComments = allComments.filter((comment) => {
    return comment.trip.id === id;
  });

  // console.log("trip home: ", trip);

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
          <p onClick={() => setShowComments(false)}>
            Favorites: {favoritesCount.length}
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
                Comments:{" "}
                {filteredComments ? `${filteredComments.length}` : "Loading"}
              </p>
              {showComments && filteredComments.length >= 1
                ? filteredComments.map((comment) => {
                    console.log(comment);
                    return (
                      <>
                        <li key={comment.id}>
                          {comment.content}...
                          {comment.user.id === mainUser.id ? (
                            <button
                              key={comment.id}
                              onClick={() =>
                                dispatch(removeComment(comment.id))
                              }
                            >
                              X
                            </button>
                          ) : null}
                        </li>
                        {/* {comment.user.id === mainUser.id ? (
                          <button>X</button>
                        ) : null} */}
                      </>
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
                      comment
                    </Button>
                    {/* ////
            ////
            ////
            //// */}
                    {!favoriteButton ? (
                      <Button
                        variant="warning"
                        onClick={() => handleAddFavorite()}
                      >
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
