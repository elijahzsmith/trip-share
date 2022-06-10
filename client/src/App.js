import React from "react";
// import UserInput from "./features/users/UserInput.js";
// import Users from "./features/users/Users.js";
import { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
// import { fetchUsers } from "./features/users/usersSlice";
import { useSelector, useDispatch } from "react-redux";
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
  const [count, setCount] = useState(0);
  const [currUser, setCurrUser] = useState(null);
  const [error, setError] = useState([]);
  const [loginInput, setLoginInput] = useState({
    name: "",
    password: "",
  });
  // const users = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const history = useHistory();

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login setCurrUser={setCurrUser} />
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
