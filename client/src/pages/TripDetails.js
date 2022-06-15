import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { fetchAllOtherUsers } from "../features/users/otherUsersSlice";

function TripDetails() {
  let locate = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const { photo_url, location, description, comments, favorites, user } =
    locate.state;
  console.log(locate.state);

  const thisUserAuth = useSelector((state) => state.otherUsers.authenticated);
  const mainUser = useSelector((state) => state.users.entities);
  // const allOtherUsers = useSelector((state) => state.otherUsers.e);

  if (!thisUserAuth) {
    <h1>Loading....</h1>;
  }

  return (
    <Container className="">
      <Row
        className="mt-5 mb-1 d-flex align-items-around mx-auto"
        style={{ maxWidth: 1000 }}
      >
        <Col className="col-md-8 text-md-start col-12 text-center my-auto ">
          <h1>{location}</h1>
        </Col>
        <Col className="text-md-end text-center my-auto text-success">
          {user.id !== mainUser.id ? (
            <h2
              onClick={() =>
                history.push(`/profile/${locate.state.user_id}`, user)
              }
            >
              {user ? user.name : null}
            </h2>
          ) : (
            <h2 onClick={() => history.push(`/profile`, user)}>
              {user ? user.name : null}
            </h2>
          )}
          {/* <h2
            onClick={() =>
              history.push(`/profile/${locate.state.user_id}`, user)
            }
          >
            {user ? user.name : null}
          </h2> */}
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
        <h2>Content:</h2>
        <p>{description}</p>
      </Row>
      <h2>Favorites: {favorites.length >= 1 ? favorites.length : 0}</h2>
      {favorites
        ? favorites.map((favorite) => {
            return (
              <p
                key={favorite.id}
                onClick={() =>
                  history.push(`/profile/${favorite.user.id}`, favorite.user)
                }
              >
                {favorite.user ? favorite.user.name : null}
              </p>
            );
          })
        : null}
      <Row className="mt-4 mx-auto" style={{ maxWidth: 1000 }}>
        <h2>
          Comments: {comments && comments.length >= 1 ? comments.length : 0}
        </h2>
        <ul>
          {comments
            ? comments.map((comment) => (
                <li key={comment.id}>
                  {comment.user ? (
                    <strong
                      onClick={() =>
                        history.push(
                          `/profile/${comment.user.id}`,
                          comment.user
                        )
                      }
                    >
                      {comment.user.username}
                    </strong>
                  ) : null}
                  : {comment.content}
                </li>
              ))
            : null}
        </ul>
      </Row>
      <Row className="d-flex align-items-around mx-auto mb-3">
        <Col className="my-auto text-center">
          {/* <h2 className="my-auto">Time Left:</h2> */}
        </Col>
      </Row>
    </Container>
  );
}
// changed from listingdetails
export default TripDetails;

// const thisFavorite = favoritesState.find((favorite) => {
//   return favorite.trip.id === locate.state.id;
//   // console.log((favorite) => favorite.trip.id === locate.state.id);
//   //
// });
// console.log(thisFavorite);
// console.log(locate.state.id, "vs", thisFavorite.trip.id);
// const thisFavorite = favoritesState.find((favorite) => {
//   return favorite.trip.id === locate.state.id;
//   // console.log((favorite) => favorite.trip.id === locate.state.id);
//   //
// });
// console.log(thisFavorite);
// console.log(locate.state.id, "vs", thisFavorite.trip.id);

// useEffect(() => {
//   dispatch(fetchOneOtherUser(user_id));
// }, []);
