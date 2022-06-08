import React from "react";
import { useSelector } from "react-redux";

function Users() {
  const users = useSelector((state) => state.users);

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.name}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
