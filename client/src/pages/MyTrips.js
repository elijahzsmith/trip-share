import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../features/users/usersSlice";
import { fetchTrips } from "../features/trips/tripsSlice";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";
import MyTripCard from "../components/MyTripCard";

function MyTrips() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrips());
    dispatch(setUser());
  }, []);

  const mainUser = useSelector((state) => state.users.entities);
  const allTrips = useSelector((state) => state.trips.entities);

  if (!allTrips) {
    return <h1>Loading...</h1>;
  }
  console.log(allTrips);

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
        <h1>My Trips</h1>
      </Row>

      <Row xs={1} sm={2} md={3} lg={4}>
        {renderMyTrips}
      </Row>
    </Container>
  );
}

export default MyTrips;
