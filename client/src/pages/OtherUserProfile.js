import React from "react";
import { useLocation } from "react-router-dom";

function OtherUserProfile() {
  let locate = useLocation();
  const { name } = locate.state;
  console.log(name);
  return (
    <div>
      OtherUserProfile
      <h1>{name}</h1>
      <button>Followers: followers.length</button>
      <button>Following: following.length</button>
    </div>
  );
}

export default OtherUserProfile;
