import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TripItem from "../components/TripItem";
import { fetchTrips } from "../features/trips/tripsSlice";

function Home() {
  const trips = useSelector((state) => {
    console.log(state);
    return state.trips.entities;
  });
  console.log("trips from useSelector: ", trips);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrips());
  }, []);

  const renderTrips = trips.map((trip) => {
    console.log("trip in map (Home): ", trip);
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
