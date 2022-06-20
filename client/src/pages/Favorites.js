import React, { useEffect } from "react";
import FavItem from "../components/FavItem";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrips } from "../features/trips/tripsSlice";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

function Favorites() {
  const favorites = useSelector((state) => state.favorites.entities);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTrips());
  }, [favorites]);

  const mainUser = useSelector((state) => state.users.entities);

  const tripsState = useSelector((state) => state.trips.entities);

  const favoritesArr = tripsState.filter((favorite) =>
    favorite.favorites.some((el) => el.user.id === mainUser.id)
  );

  const renderFavorites =
    favoritesArr && mainUser
      ? favoritesArr.map((fav) => <FavItem key={fav.id} fav={fav} />)
      : null;

  return (
    <Container fluid>
      <Row className="text-center mt-5">
        <h1>Favorites</h1>
      </Row>
      <hr></hr>
      <br></br>
      <Row xs={1} sm={2} md={3} lg={4}>
        {renderFavorites}
      </Row>
    </Container>
  );
}

export default Favorites;
