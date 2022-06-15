import React, { useEffect, useState } from "react";
import FavItem from "../components/FavItem";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrips } from "../features/trips/tripsSlice";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/esm/Button";

function Favorites() {
  const favorites = useSelector((state) => state.favorites.entities);
  // const favorites = useSelector((state) => state.users.entities.favorites);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTrips());
  }, [favorites]);

  //THIS WAY DOESNT UPDATE IN REAL TIME AND NO DETAILS LINK BUT IT DOES ALLOW FOR EASY DELETION
  // const renderFavorites = favorites
  //   ? favorites.map((fav) => <FavItem key={fav.id} fav={fav} />)
  //   : null;

  const mainUser = useSelector((state) => state.users.entities);

  const tripsState = useSelector((state) => state.trips.entities);
  console.log(tripsState);

  const favoritesArr = tripsState.filter((favorite) =>
    favorite.favorites.some((el) => el.user.id === mainUser.id)
  );

  // const favoritesArr = tripsState.filter(
  //   (favorite) => favorite.user.id === mainUser.id
  // );
  // console.log(
  //   "favoritesUser: ",
  //   favoritesUser,
  //   "vs",
  //   "tripsState: ",
  //   favoritesArr,

  //   "tripsState: ",
  //   tripsState
  // );

  // const renderFavorites = favoritesArr
  //   ? mainUser.favorites.map((fav) => <FavItem key={fav.id} fav={fav} />)
  //   : null;

  const renderFavorites =
    favoritesArr && mainUser
      ? favoritesArr.map((fav) => <FavItem key={fav.id} fav={fav} />)
      : null;

  return (
    <Container fluid>
      <Row className="text-center mt-5">
        <h1>Favorites</h1>
      </Row>
      <Row className="d-flex justify-content-end my-2">
        <Col className="mx-auto h-100 my-2">
          <InputGroup>
            <FormControl
              placeholder="Search Favorites..."
              aria-label="Search"
              aria-describedby="basic-addon2"
              name="search"
              //   value={currSearch}
              //   onChange={(e) => setCurrSearch(e.target.value)}
            />
            <Dropdown as={ButtonGroup}>
              <Button
                variant="primary"
                size="lg"
                // onClick={() => handleSortAlphabetically()}
              >
                Sort
              </Button>

              <Dropdown.Toggle
                split
                variant="primary"
                id="dropdown-split-basic"
              />

              {/* <Dropdown.Menu> {renderCategories}</Dropdown.Menu> */}
            </Dropdown>
          </InputGroup>
        </Col>
      </Row>
      <Row xs={1} sm={2} md={3} lg={4}>
        {renderFavorites}
      </Row>
    </Container>
  );
}

export default Favorites;
