import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTrips = createAsyncThunk("trips/fetchTrips", () => {
  return fetch("/trips")
    .then((res) => res.json())
    .then((data) => data);
});

const tripsSlice = createSlice({
  name: "trips",
  initialState: {
    entities: [],
    status: "idle",
  },
  reducers: {
    tripAdded(state, action) {
      state.entities.push(action.payload);
    },
  },
  extraReducers: {
    [fetchTrips.pending](state) {
      state.status = "loading";
    },
    [fetchTrips.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
    },
  },
});

export const { tripAdded } = tripsSlice.actions;

export default tripsSlice.reducer;

// THE NON TOOLKIT WAY

// export function fetchTrips() {
//   return function (dispatch) {
//     dispatch({ type: "trips/tripsLoading" });
//     fetch("/trips")
//       .then((res) => res.json())
//       .then((trips) => {
//         console.log("trips tripsSlice: ", trips);
//         dispatch({
//           type: "trips/tripsLoaded",
//           payload: trips,
//         });
//       });
//   };
// }

// const tripsSlice = createSlice({

//     name: "trips",
//     initialState = {
//           entities: [], //array of trips
//           status: "idle", //loading status for fetch
//         }
// })
// // const initialState = {
// //   name: "trips",
// //   entities: [], //array of trips
// //   status: "idle", //loading status for fetch
// // };

// export default function tripsReducer(state = initialState, action) {
//   switch (action.type) {
//     case "trips/tripsLoaded":
//       return {
//         ...state,
//         status: "idle",
//         entities: action.payload,
//       };
//     case "trips/tripsLoading":
//       return {
//         ...state,
//         status: "loading",
//       };
//     default:
//       return state;
//   }
// }
