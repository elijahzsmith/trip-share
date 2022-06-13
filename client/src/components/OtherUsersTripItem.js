import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneOtherUser } from "../features/users/otherUsersSlice";
import {
  addFavorite,
  unfavorite,
  fetchFavorites,
} from "../features/favorites/favoritesSlice";
import Button from "react-bootstrap/Button";
import { addComment } from "../features/comments/commentsSlice";

function OtherUsersTripItem({ trip }) {
  const {
    id,
    location,
    photo_url,
    user,
    comments,
    description,
    user_id,
    favorites,
  } = trip;
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavorites());
    dispatch(fetchOneOtherUser(user_id));
  }, []);
  // console.log(trip);

  const mainUser = useSelector((state) => state.users.entities);
  const favoritesArray = useSelector((state) => state.favorites.entities);
  const thisUserAuth = useSelector((state) => state.otherUsers.authenticated);
  // const [iconState, setIconState] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentData, setCommentData] = useState({
    content: "",
    user_id: "",
    trip_id: trip.id,
  });
  console.log();
  if (!thisUserAuth) {
    <h1>Loading....</h1>;
  }
  const thisUser = useSelector((state) => state.otherUsers.entities);

  const handleChange = (e) => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value });
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    setCommentData({
      content: e.target.value,
      user_id: mainUser.id,
      trip_id: trip.id,
    });
    dispatch(addComment(commentData));
    setShowForm(false);
  };

  const handleAddFavorite = () => {
    const favoriteObj = {
      user_id: mainUser.id,
      trip_id: trip.id,
    };
    dispatch(addFavorite(favoriteObj));
  };

  const favoritesCount = favoritesArray.filter(
    (favorite) =>
      favorite.trip.user_id === thisUser.id && favorite.trip.id === trip.id
  );

  const handleRemoveFavorite = () => {
    const favoriteToRemove = favoritesCount.find(
      (favorite) => favorite.user.id === mainUser.id
    );
    dispatch(unfavorite(favoriteToRemove.id));
  };

  const favoriteButton = favoritesCount.some((el) => el.trip.id === trip.id);

  return (
    <Col>
      <Card className="h-100">
        <Card.Img
          src={photo_url}
          alt="listing"
          onClick={() => history.push(`/details/${id}`, trip)}
          role="button"
          className="h-75"
        />
        <Card.Body className="text-center">
          <Card.Title className="text-center">{location}</Card.Title>
          <h5 onClick={() => history.push(`/profile/${thisUser.id}`, thisUser)}>
            {thisUser.username}
          </h5>
          <p>Favorites: {favoritesCount.length}</p>
          <Container className="ms-2">
            <Row>
              <Col className="d-flex justify-content-center">
                {!favoriteButton ? (
                  <Button variant="warning" onClick={() => handleAddFavorite()}>
                    {" "}
                    Favorite{" "}
                  </Button>
                ) : (
                  <Button
                    variant="warning"
                    onClick={() => handleRemoveFavorite()}
                  >
                    {" "}
                    Unfavorite{" "}
                  </Button>
                )}
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Col>
  );
}
//   return (
//     <Col>
//       <Card className="h-100">
//         <Card.Img
//           src={photo_url}
//           alt="listing"
//           onClick={() => history.push(`/details/${trip.id}`, trip)}
//           role="button"
//           className="h-75"
//         />
//         {/* {renderIcon()} */}
//         <Card.Body>
//           <Card.Title className="text-center">{location}</Card.Title>
//           <h6 onClick={() => history.push(`/profile/${user.id}`, user)}>
//             {mainUser
//               ? mainUser.username === thisUser.username
//                 ? null
//                 : thisUser.username
//               : null}
//           </h6>
//           <p onClick={() => setShowComments(false)}>
//             Favorites: {favorites.length}
//           </p>
//           {showForm ? (
//             <form onSubmit={(e) => handleAddComment(e)}>
//               <input
//                 type="text"
//                 placeholder="comment..."
//                 name="content"
//                 onChange={(e) => handleChange(e)}
//               ></input>
//               <button type="submit">Post Comment</button>
//             </form>
//           ) : (
//             <>
//               <p
//                 onClick={() => setShowComments((showComments) => !showComments)}
//               >
//                 Comments: {comments.length >= 1 ? comments.length : 0}
//               </p>
//               {showComments && comments.length >= 1
//                 ? comments.map((comment) => {
//                     return (
//                       <li key={comment.id}>
//                         {comment.content.substring(0, 8)}...
//                       </li>
//                     );
//                   })
//                 : null}
//             </>
//           )}
//           <Container className="ms-2">
//             <Row>
//               <Col className="d-flex justify-content-center">
//                 {mainUser.username === user.username ? null : showForm ? (
//                   <Button onClick={() => setShowForm((showForm) => !showForm)}>
//                     Close Comment Form
//                   </Button>
//                 ) : (
//                   <>
//                     <Button
//                       variant="primary"
//                       onClick={() => setShowForm((showForm) => !showForm)}
//                     >
//                       comment
//                     </Button>
//                     {/* <Button
//                     variant="warning"
//                     onClick={() => handleAddFavorite()}
//                   >
//                     favorite
//                   </Button> */}
//                     {!favoriteButton ? (
//                       <Button
//                         variant="warning"
//                         onClick={() => handleAddFavorite()}
//                       >
//                         {" "}
//                         Favorite{" "}
//                       </Button>
//                     ) : (
//                       <Button
//                         variant="warning"
//                         onClick={() => handleRemoveFavorite()}
//                       >
//                         {" "}
//                         Unfavorite{" "}
//                       </Button>
//                     )}
//                   </>
//                 )}
//               </Col>
//             </Row>
//           </Container>
//         </Card.Body>
//       </Card>
//     </Col>
//   );
// }
export default OtherUsersTripItem;
// function renderIcon() {
//   switch (iconState) {
//     case "Ongoing": {
//       return (
//         <Card.ImgOverlay
//           className="d-flex flex-column align-items-end h-75"
//           // onClick={() => handleCardClick(id, fav.listing)}
//           role="button"
//         >
//           <div className="mt-0 bg-white rounded p-1">
//             <i className="bi bi-hourglass-split text-yellow h3"></i>
//           </div>
//         </Card.ImgOverlay>
//       );
//     }
//     default: {
//       return null;
//     }
//   }
// }
