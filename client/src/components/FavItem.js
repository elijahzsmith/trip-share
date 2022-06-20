import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { unfavorite } from "../features/favorites/favoritesSlice";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function FavItem({ fav }) {
  const mainUser = useSelector((state) => state.users.entities);
  const mainUsersFavorites = useSelector(
    (state) => state.users.entities.favorites
  );
  const history = useHistory();
  const dispatch = useDispatch();

  const { id, location, photo_url, description, favorites } = fav;
  console.log(favorites);
  const yourFavoriteForThisPost = favorites.filter(
    (favorite) => favorite.user.id === mainUser.id && favorite.trip.id === id
  );

  // const { id, location, photo_url, description } = fav.trip;
  return (
    <Col>
      <Card className="h-100">
        <Card.Img
          src={photo_url}
          alt="listing"
          onClick={() => history.push(`/details/${fav.id}`, fav)}
          role="button"
          className="h-75"
        />
        {/* {renderIcon()} */}
        <Card.Body>
          <Card.Title className="text-center">{location}</Card.Title>
          {/* <p onClick={() => history.push(`/profile/${user.id}`, user)}>
            {user.username}
          </p> */}
          <Container className="ms-2">
            <Row>
              <Col className="d-flex justify-content-center">
                <Button
                  variant="warning"
                  // onClick={() => console.log(fav.id)}
                  //find the favorite id not the trip id
                  onClick={() =>
                    dispatch(unfavorite(yourFavoriteForThisPost[0].id))
                  }
                >
                  {" "}
                  Remove Favorite <i class="bi bi-heart-fill"></i>
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

//   function renderIcon() {
//     switch (iconState) {
//       case "Ongoing": {
//         return (
//           <Card.ImgOverlay
//             className="d-flex flex-column align-items-end h-75"
//             // onClick={() => handleCardClick(id, fav.listing)}
//             role="button"
//           >
//             <div className="mt-0 bg-white rounded p-1">
//               <i className="bi bi-hourglass-split text-yellow h3"></i>
//             </div>
//           </Card.ImgOverlay>
//         );
//       }
//       default: {
//         return null;
//       }
//     }
//   }
