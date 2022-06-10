import React from "react";
import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./features/users/usersSlice";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import EditProfileForm from "./pages/EditProfileForm";
import About from "./pages/About";
import "./index.scss";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import MyTrips from "./pages/MyTrips";
import Following from "./pages/Following";
import PostTripForm from "./pages/PostTripForm";
import TripDetails from "./pages/TripDetails";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.entities);

  useEffect(() => {
    dispatch(setUser());
    console.log("hello");
  }, []);

  console.log(user);

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/editprofile">
          <EditProfileForm />
        </Route>
        <Route exact path="/posttrip">
          <PostTripForm />
        </Route>
        <Route exact path="/following">
          <Following />
        </Route>
        <Route exact path="/mytrips">
          <MyTrips />
        </Route>
        <Route exact path="/favorites">
          <Favorites />
        </Route>
        <Route exact path="/details/:id">
          <TripDetails />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

{
  /* <Navbar />
<Routes>
  <Route exact path="/" element={<Home />} />
  <Route exact path="/login" element={<Login />} />
  <Route exact path="/signup" element={<Signup />} />
  <Route exact path="/profile" element={<Profile />} />
  <Route exact path="/editprofile" element={<EditProfileForm />} />
  <Route exact path="/posttrip" element={<PostTripForm />} />
  <Route exact path="/following" element={<Following />} />
  <Route exact path="/mytrips" element={<MyTrips />} />
  <Route exact path="/favorites" element={<Favorites />} />
  <Route exact path="/details/:id" element={<TripDetails />} />
  <Route exact path="/about" element={<About />} />
</Routes> */
}
