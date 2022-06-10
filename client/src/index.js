import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import thunkMiddleware from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import App from "./App";
import { Provider } from "react-redux";
// import { createStore, applyMiddleware } from "redux";
import store from "./store";

// import usersReducer from "./features/users/usersSlice";

// const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

// // const store = createStore(usersReducer, composedEnhancer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
// root.render(
//   <Provider store={store}>
//     <BrowserRouter>
//       <App store={store} />
//     </BrowserRouter>
//   </Provider>
// );
