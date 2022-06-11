import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TripItem from "../components/TripItem";
import { fetchTrips } from "../features/trips/tripsSlice";

function Home() {
  const trips = useSelector((state) => {
    return state.trips.entities;
  });
  // console.log("trips from useSelector (Home): ", trips);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.entities);
  // console.log(user);

  useEffect(() => {
    dispatch(fetchTrips());
  }, []);

  const renderTrips = trips.map((trip) => {
    return <TripItem key={trip.id} trip={trip} />;
  });

  return (
    <div>
      Home
      {renderTrips}
    </div>
  );
}

export default Home;
