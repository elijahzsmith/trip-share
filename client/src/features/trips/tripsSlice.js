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

export const postTrip = createAsyncThunk(
  "trips/postTrip",
  (formData, history, setError) => {
    console.log("history: ", history);
    return fetch(`/trips`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((trip) => {
          console.log("trip: ", trip);
          history.push("/mytrips");
          return trip;
        });
      } else {
        return res.json().then((err) => {
          setError(err);
        });
      }
    });
  }
);

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
      // state.entities = action.payload;
      const filteredState = state.entities.filter(
        (trip) => trip.id !== action.payload.id
      );

      state.entities = [...filteredState, action.payload];
      // state.entities = [...state.entities, ([action.payload]: action.payload)];
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
      state.entities = state.entities.push(action.payload);
      state.status = "idle";
    },
    [deleteTrip.pending](state) {
      state.status = "loading";
    },
    [deleteTrip.fulfilled](state, action) {
      const afterDelete = state.entities.filter(
        (trip) => action.payload !== trip.id
      );
      state.entities = afterDelete;
      state.status = "idle";
    },
  },
});

export const { tripAdded } = tripsSlice.actions;

export default tripsSlice.reducer;
