import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./usersSlice";

function UserInput() {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(addUser({ name }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <input
          type="text"
          onChange={handleNameChange}
          id="name"
          placeholder="user name"
        />
      </p>
      <button type="submit">Submit</button>
    </form>
  );
}

export default UserInput;
