import React from "react";
import { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./features/users/usersSlice";
import { fetchComments } from "./features/comments/commentsSlice";
import { fetchFavorites } from "./features/favorites/favoritesSlice";
///////////////
import { fetchAllOtherUsers } from "./features/users/otherUsersSlice";
import { fetchTrips } from "./features/trips/tripsSlice";
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
import OtherFollowing from "./pages/OtherFollowing";
import PostTripForm from "./pages/PostTripForm";
import TripDetails from "./pages/TripDetails";
import Followers from "./pages/Followers";
import OtherFollowers from "./pages/OtherFollowers";
import OtherUserProfile from "./pages/OtherUserProfile";
import EditTripPostForm from "./pages/EditTripPostForm";
import LandingPage from "./pages/LandingPage";

function App() {
  const dispatch = useDispatch();
  const authorized = useSelector((state) => state.users.authorized);

  useEffect(() => {
    dispatch(setUser());
    dispatch(fetchFavorites());
  }, []);

  if (!authorized) {
    return (
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
      </Switch>
    );
  }

  return (
    <div className="App">
      <Navbar className="fixed-top" />
      <Switch className="fluid">
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
        <Route exact path="/edittrip/:id">
          <EditTripPostForm />
        </Route>
        <Route exact path="/posttrip">
          <PostTripForm />
        </Route>
        <Route exact path="/following">
          <Following />
        </Route>
        <Route exact path="/followers">
          <Followers />
        </Route>
        <Route exact path="/otherfollowers/:id">
          <OtherFollowers />
        </Route>
        <Route exact path="/otherfollowing/:id">
          <OtherFollowing />
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
        <Route exact path="/profile/:id">
          <OtherUserProfile />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
