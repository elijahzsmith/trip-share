import React from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchUsers from "./usersSlice";

function Users() {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users.entities);

  const handleClick = () => {
    dispatch(fetchUsers);
  };

  const renderUsers = users.map((user) => <li key={user.name}>{user.name}</li>);

  return (
    <div>
      <button onClick={handleClick}>Get Users</button>
      <ul>{renderUsers}</ul>
    </div>
  );
}

export default Users;
