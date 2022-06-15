import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { addFavorite, unfavorite } from "../features/favorites/favoritesSlice";
import { addComment } from "../features/comments/commentsSlice";

function FavItem({ trip }) {
  const [showForm, setShowForm] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const mainUser = useSelector((state) => state.users.entities);
  ////
  ////
  ////
  const favoritesArray = useSelector((state) => state.favorites.entities);

  const [commentData, setCommentData] = useState({
    content: "",
    user_id: "",
    trip_id: trip.id,
  });
  // const [commentData, setCommentData] = useState({
  //   content: "",
  //   user_id: "",
  //   trip_id: trip.id,
  // });
  if (!mainUser) {
    return <h1>Loading...</h1>;
  }

  const {
    location,
    photo_url,
    description,
    user,
    favorites,
    comments,
    user_id,
  } = trip;
  // console.log(trip, user_id);

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
    console.log(mainUser);
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
    // return favorite.trip.user_id === user.id && favorite.trip.id === trip.id;
  });

  const handleRemoveFavorite = () => {
    const favoriteToRemove = favoritesCount.find(
      (favorite) => favorite.user.id === mainUser.id
    );
    dispatch(unfavorite(favoriteToRemove.id));
  };

  // const favoriteButton = favoritesCount.some((el) => el.trip.id === trip.id);
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
            {/* ////
            ////
            ////
            //// */}
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
                {mainUser.username === user.username ? (
                  <h5 onClick={() => history.push("/mytrips")}>Your Post</h5>
                ) : showForm ? (
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
