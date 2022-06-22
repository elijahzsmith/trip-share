import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../features/users/usersSlice";
import { fetchTrips } from "../features/trips/tripsSlice";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import MyTripCard from "../components/MyTripCard";

function MyTrips() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showButton, setShowButton] = useState(false);

  const mainUser = useSelector((state) => state.users.entities);
  const allTrips = useSelector((state) => state.trips.entities);
  useEffect(() => {
    dispatch(fetchTrips());
    // dispatch(setUser());
  }, []);
  // }, [allTrips]);

  if (!allTrips) {
    return <h1>Loading...</h1>;
  }

  const yourTrips = allTrips.filter((trip) => trip.user.id === mainUser.id);

  if (!yourTrips) {
    return <h1>Loading...</h1>;
  }

  if (!mainUser) {
    return <h1>Loading...</h1>;
  }

  const renderMyTrips = yourTrips.map((trip) => {
    return <MyTripCard key={trip.id} trip={trip} />;
  });

  return (
    <Container fluid>
      <Row className="text-center mt-5 mb-3">
        <h1 onClick={() => setShowButton((showButton) => !showButton)}>
          My Trips
        </h1>
        {showButton ? (
          <Button onClick={() => history.push("/profile")}>
            Go to Profile
          </Button>
        ) : null}
      </Row>

      <Row xs={1} sm={2} md={3} lg={4}>
        {renderMyTrips}
      </Row>
    </Container>
  );
}

export default MyTrips;
