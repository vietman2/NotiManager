import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { RecurrentReservationType, ReservationType } from "../../types";
import { RecurrenceType } from "../../components/Recurrence";

export const postRecurrentReservation = createAsyncThunk(
  "reservation/postRecurrentReservation",
  async (data: { reservation: RecurrenceType }) => {
    await axios.post<RecurrentReservationType>("/api/reservation/", data);
  }
);

const initialState: {
  selectedReservation: ReservationType | null;
  reservations: ReservationType[];
} = {
  selectedReservation: null,
  reservations: [],
};

export const reducer = createSlice({
  initialState,
  name: "reservation",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postRecurrentReservation.fulfilled, (state, action) => {
      // state.reservations.push(action.payload.reservation);
    });
  },
});

export default reducer.reducer;
export const reservationActions = reducer.actions;
