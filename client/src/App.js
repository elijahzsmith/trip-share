import React from "react";
import UserInput from "./features/UserInput.js";
import Users from "./features/Users.js";
import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { fetchUsers } from "./features/usersSlice";
import { useSelector, useDispatch } from "react-redux";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import EditProfileForm from "./pages/EditProfileForm";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import PostTripForm from "./pages/PostTripForm";
import TripDetails from "./pages/TripDetails";

function App() {
  const [count, setCount] = useState(0);
  const users = useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("/hello")
      .then((res) => res.json())
      .then((data) => setCount(data.count));
    // dispatch(fetchUsers());
  }, []);

  // const handleAdd = () => {};

  // const handleSubtract = () => {};
  console.log("users: ", users);

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
  /* <Route exact path="/usersinput">
          <h1>Page Count: {count}</h1>
        </Route> */
}

{
  /* <Route exact path="/">
          <h1>User Input</h1>
          <Users />
          <UserInput />
        </Route> */
}

{
  /* <Route path="/testing">
            <h1>Test Route</h1>
            <button onClick={handleAdd}>+</button>
            <button onClick={handleSubtract} it>
              -
            </button>
          </Route>
          <Route path="/">
            <h1>Page Count: {count}</h1>
          </Route> */
}
