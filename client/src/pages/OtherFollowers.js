import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { addFollow, unfollow } from "../features/follows/followsSlice";
// import Button from "react-bootstrap/Button";

function OtherFollowers() {
  const history = useHistory();
  // const dispatch = useDispatch();
  const ourFollowers = useSelector(
    (state) => state.otherUsers.entities.followers
  );
  const mainUser = useSelector((state) => state.users.entities);
  const followers = useSelector((state) => state.follows.entities);

  const user = useSelector((state) => state.otherUsers.entities);

  const authorized = useSelector((state) => state.users.authorized);
  if (!authorized) {
    return <h1>Loading....</h1>;
  }
  if (!ourFollowers) {
    return <h1>Loading....</h1>;
  }

  // const userFollowers = followers.filter((follow) => {
  //   return follow.followee.id === user.id;
  // });
  const userFollowers = followers.filter((follow) => {
    return follow.followee.id === user.id;
  });

  // console.log(userFollowers, "vs", followers, "vs", ourFollowers);

  // const followButton = () => {
  //   return userFollowers.some((el) => {
  //     return el.username === mainUser.username;
  //   });
  // };

  // const followButtonTwo = () => {
  //   return ourFollowers.some((el) => {
  //     return el.username === mainUser.username;
  //   });
  // };

  // const handleDelete = () => {
  //   const followToDelete = followers.find((follow) => {
  //     return (
  //       follow.followee.id === user.id && follow.follower.id === mainUser.id
  //     );
  //   });
  //   console.log(followToDelete);
  //   // dispatch(unfollow(followToDelete.id));
  // };

  // const handleAdd = () => {
  //   const followObj = { followee_id: user.id, follower_id: mainUser.id };
  //   dispatch(addFollow(followObj));
  // };

  return (
    <div>
      <h2>
        {user.name} has: {ourFollowers.length} followers
      </h2>
      {userFollowers.map((follower) => {
        // {ourFollowers.map((follower) => {
        return follower.follower.username !== mainUser.username ? (
          <>
            <li
              key={follower.follower.id}
              onClick={() =>
                history.push(
                  `/profile/${follower.follower.id}`,
                  follower.follower
                )
              }
            >
              {/* <p */}
              {/* onClick={() => history.push(`/profile/${follower.id}`, follower)} */}
              {/* > */}
              {follower.follower.name}
            </li>
            {/* {!followButton() ? (
              <Button variant="warning" onClick={() => handleDelete()}>
                <i class="bi bi-person-fill"></i>
              </Button>
            ) : (
              <Button onClick={() => handleAdd()}>
                <i class="bi bi-person"></i>
              </Button>
            )} */}
          </>
        ) : (
          <li key={follower.id} onClick={() => history.push("/profile")}>
            {follower.follower.name}
          </li>
        );
      })}
    </div>
  );
}
export default OtherFollowers;
