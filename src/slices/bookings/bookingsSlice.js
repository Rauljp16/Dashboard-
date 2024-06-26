import { createSlice } from "@reduxjs/toolkit";
import {
  createThunk,
  deleteThunk,
  fetchAllThunk,
  fetchSingleThunk,
  updateThunk,
} from "./bookingsThunk";

export const bookingsSlice = createSlice({
  name: "bookingSlice",
  initialState: {
    status: "idle",
    dataBooking: [],
    singleBooking: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllThunk.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.dataBooking = action.payload;
      })
      .addCase(fetchSingleThunk.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.singleBooking = action.payload;
      });
    //   .addCase(createThunk.fulfilled, (state, action) => {
    //     state.dataBooking.push(action.payload);
    //   })
    //   .addCase(updateThunk.fulfilled, (state, action) => {
    //     const index = state.data.findIndex(
    //       (post) => post.id === action.payload.id
    //     );
    //     state.dataBooking[index] = action.payload;
    //   })
    //   .addCase(deleteThunk.fulfilled, (state, action) => {
    //     state.dataBooking = state.data.filter(
    //       (post) => post.id !== action.payload
    //     );
    //   });
  },
});
