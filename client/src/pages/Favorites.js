import React, { useEffect, useState } from "react";
import FavItem from "../components/FavItem";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/esm/Button";

function Favorites() {
  // const user = useSelector((state) => state.users.entities);
  // if (!user) {
  //   <h1>Loading...</h1>;
  // }
  const favorites = useSelector((state) => state.users.entities.favorites);
  console.log(favorites);

  const renderFavorites = favorites.map((fav) => (
    <FavItem key={fav.id} fav={fav} />
  ));
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
