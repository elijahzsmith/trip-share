import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTrips = createAsyncThunk("trips/fetchTrips", () => {
  return fetch("/trips")
    .then((res) => res.json())
    .then((trips) => {
      return trips;
    });
});

export const fetchOneTrip = createAsyncThunk("trips/fetchOneTrip", (id) => {
  return fetch(`/trips/${id}`)
    .then((res) => res.json())
    .then((trip) => {
      return trip;
    });
});

export const editTrip = createAsyncThunk("trips/editTrip", (formData) => {
  console.log(formData, formData.id);
  return fetch(`/trips/${formData.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((trips) => {
      return trips;
    });
});

export const postTrip = createAsyncThunk("trips/postTrip", (formData) => {
  console.log("formData: ", formData);
  return fetch(`/trips`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((trip) => {
      return trip;
    });
});

export const deleteTrip = createAsyncThunk("trips/deleteTrip", (id) => {
  return fetch(`/trips/${id}`, { method: "DELETE" }).then(() => id);
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
    tripEdited(state, action) {
      state.entities = action.payload;
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
    [editTrip.pending](state) {
      state.status = "loading";
    },
    [editTrip.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
    },
    [fetchOneTrip.pending](state) {
      state.status = "loading";
    },
    [fetchOneTrip.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
    },
    [postTrip.pending](state) {
      state.status = "loading";
    },
    [postTrip.fulfilled](state, action) {
      state.entities.push(action.payload);
      state.status = "idle";
    },
    [deleteTrip.pending](state) {
      state.status = "loading";
    },
    [deleteTrip.fulfilled](state, action) {
      state.entities = state.entities
        .filter((trip) => action.payload.id !== trip.id)
        .push(action.payload);
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
