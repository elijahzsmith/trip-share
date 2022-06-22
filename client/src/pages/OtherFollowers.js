import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/esm/Container";

function OtherFollowers() {
  const history = useHistory();

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

  const userFollowers = followers.filter((follow) => {
    return follow.followee.id === user.id;
  });

  const numberOfFollowers = () => {
    if (ourFollowers.length > 1) {
      return `${ourFollowers.length} followers`;
    } else if (ourFollowers.length === 1) {
      return `${ourFollowers.length} follower`;
    } else {
      return `no followers`;
    }
  };

  return (
    <Container fluid>
      <Container className="mx-auto mt-5">
        <h1>
          {user.name} has: {numberOfFollowers()}
        </h1>
        <hr></hr>
        {userFollowers.map((follower) => {
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
                {follower.follower.name}
              </li>
            </>
          ) : (
            <li key={follower.id} onClick={() => history.push("/profile")}>
              {follower.follower.name}
            </li>
          );
        })}
      </Container>
    </Container>
  );
}
export default OtherFollowers;

// {ourFollowers.map((follower) => {
// {
//   /* <p */
// }
// {
//   /* onClick={() => history.push(`/profile/${follower.id}`, follower)} */
// }
// {
//   /* > */
// }

// {
//   /* {!followButton() ? (
//               <Button variant="warning" onClick={() => handleDelete()}>
//                 <i class="bi bi-person-fill"></i>
//               </Button>
//             ) : (
//               <Button onClick={() => handleAdd()}>
//                 <i class="bi bi-person"></i>
//               </Button>
//             )} */
// }
// const dispatch = useDispatch();

// import { addFollow, unfollow } from "../features/follows/followsSlice";
// import Button from "react-bootstrap/Button";

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
