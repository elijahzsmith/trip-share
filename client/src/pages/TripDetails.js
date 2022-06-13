import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { fetchOneOtherUser } from "../features/users/otherUsersSlice";

function TripDetails() {
  let locate = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const { photo_url, location, description, user_id, comments, favorites } =
    locate.state;

  useEffect(() => {
    dispatch(fetchOneOtherUser(user_id));
  }, []);

  const thisUserAuth = useSelector((state) => state.otherUsers.authenticated);

  if (!thisUserAuth) {
    <h1>Loading....</h1>;
  }

  const thisUser = useSelector((state) => state.otherUsers.entities);
  console.log(favorites);

  return (
    <Container className="">
      <Row
        className="mt-5 mb-1 d-flex align-items-around mx-auto"
        style={{ maxWidth: 1000 }}
      >
        <Col className="col-md-8 text-md-start col-12 text-center my-auto ">
          <h1>{location}</h1>
        </Col>
        <Col className="text-md-end text-center my-auto text-secondary">
          <h2 onClick={() => history.push(`/profile/${thisUser.id}`, thisUser)}>
            {thisUser.name}
          </h2>
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
        ? favorites.map((favorite) => (
            <p key={favorite.id}>{favorite.user.name}</p>
          ))
        : null}
      <Row className="mt-4 mx-auto" style={{ maxWidth: 1000 }}>
        <h2>Comments: {comments.length >= 1 ? comments.length : 0}</h2>
        <ul>
          {comments
            ? comments.map((comment) => (
                <li key={comment.id}>{comment.content}</li>
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
