import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

import { addFavorite, unfavorite } from "../features/favorites/favoritesSlice";
// import { addComment } from "../features/comments/commentsSlice";

function TripDetails() {
  let locate = useLocation();
  const history = useHistory();
  const [showComments, setShowComments] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const { photo_url, location, description, comments, favorites, user } =
    locate.state;

  const thisUserAuth = useSelector((state) => state.otherUsers.authenticated);
  const mainUser = useSelector((state) => state.users.entities);
  const allComments = useSelector((state) => state.comments.entities);

  if (!thisUserAuth) {
    <h1>Loading....</h1>;
  }
  if (!allComments) {
    <h1>Loading....</h1>;
  }
  const favoritesArray = useSelector((state) => state.favorites.entities);

  const favoritesCount = favoritesArray.filter((favorite) => {
    return favorite.trip.id === locate.state.id;
  });

  const favoriteButton = favoritesCount.some(
    (el) => el.user.username === mainUser.username
  );

  // const [showForm, setShowForm] = useState(false);

  const dispatch = useDispatch();

  const [commentData, setCommentData] = useState({
    content: "",
    user_id: "",
    trip_id: locate.state.id,
  });

  if (!mainUser) {
    return <h1>Loading...</h1>;
  }

  // const filteredComments = allComments.filter((comment) => {
  //   return comment.trip.id === id;
  // });

  const handleAddFavorite = () => {
    const favoriteObj = {
      user_id: mainUser.id,
      trip_id: locate.state.id,
    };
    dispatch(addFavorite(favoriteObj));
  };

  // const handleChange = (e) => {
  //   setCommentData({ ...commentData, [e.target.name]: e.target.value });
  // };
  // const handleAddComment = (e) => {
  //   e.preventDefault();
  //   const commentObj = {
  //     content: commentData.content,
  //     user_id: mainUser.id,
  //     trip_id: locate.state.id,
  //   };
  //   dispatch(addComment(commentObj));
  //   setShowForm(false);
  // };

  const handleRemoveFavorite = () => {
    const favoriteToRemove = favoritesCount.find(
      (favorite) => favorite.user.id === mainUser.id
    );
    dispatch(unfavorite(favoriteToRemove.id));
  };

  return (
    <Container className="">
      <Row
        className="mt-5 mb-1 d-flex align-items-around mx-auto"
        style={{ maxWidth: 1000 }}
      >
        <Col className="col-md-8 text-md-start col-12 text-center my-auto ">
          <h1>{location}</h1>
        </Col>
        <Col
          className="text-md-end text-center my-auto text-primary"
          // text-primary
          // text-success
        >
          {user.id !== mainUser.id ? (
            <h2
              // variant="primary"
              onClick={() =>
                history.push(`/profile/${locate.state.user_id}`, user)
              }
            >
              {user ? user.name : null}
            </h2>
          ) : (
            <h2
              // variant="primary"
              onClick={() => history.push(`/profile`, user)}
            >
              {user ? user.name : null}
            </h2>
          )}
        </Col>
      </Row>

      <Row className="d-flex justify-content-center my-3">
        <img
          src={photo_url}
          alt="listing"
          style={{ maxHeight: 700, maxWidth: 1000 }}
        />
      </Row>
      <Row className="mt-4 mx-auto" style={{ maxWidth: 1000 }}>
        <Col>
          <h5
            onClick={() => setShowFavorites((showFavorites) => !showFavorites)}
          >
            Favorites: {favorites.length >= 1 ? favorites.length : 0}
          </h5>

          {showFavorites && favorites
            ? favorites.map((favorite) => {
                return (
                  <p
                    key={favorite.id}
                    onClick={() => {
                      favorite.user.id !== mainUser.id
                        ? history.push(
                            `/profile/${favorite.user.id}`,
                            favorite.user
                          )
                        : history.push(`/profile`);
                    }}
                  >
                    {favorite.user ? favorite.user.name : null}
                  </p>
                );
              })
            : null}
          {/* {locate.state.user_id !== mainUser.id ? (
            !favoriteButton ? (
              <Button variant="warning" onClick={() => handleAddFavorite()}>
                {" "}
                <i className="bi bi-heart"></i>
              </Button>
            ) : (
              <Button variant="warning" onClick={() => handleRemoveFavorite()}>
                {" "}
                <i className="bi bi-heart-fill"></i>{" "}
              </Button>
            )
          ) : null} */}
        </Col>
        <Col>
          <h5 onClick={() => setShowComments((showComments) => !showComments)}>
            Comments: {comments && comments.length >= 1 ? comments.length : 0}
          </h5>
          <ul>
            {showComments && comments
              ? comments.map((comment) => (
                  <li key={comment.id}>
                    {comment.user ? (
                      <strong
                        onClick={() => {
                          comment.user.id !== mainUser.id
                            ? history.push(
                                `/profile/${comment.user.id}`,
                                comment.user
                              )
                            : history.push(`/profile`);
                        }}
                      >
                        {comment.user.username}
                      </strong>
                    ) : null}
                    : {comment.content}
                  </li>
                ))
              : null}
          </ul>
        </Col>
      </Row>
      <Row className="mt-0 mx-auto" style={{ maxWidth: 1000 }}>
        <h2>Content:</h2>
        <p>{description}</p>
      </Row>
      <Row className="d-flex align-items-around mx-auto mb-3">
        <Col className="my-auto text-center"></Col>
      </Row>
    </Container>
  );
}

export default TripDetails;
