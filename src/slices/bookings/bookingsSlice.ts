import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createThunk,
  deleteThunk,
  fetchAllThunk,
  fetchSingleThunk,
  updateThunk,
} from "./bookingsThunk";

import { DataBookings } from "../../types/global";
export interface StateBooking {
  singleRoom: any;
  status: string;
  dataBooking: DataBookings[];
  singleBooking: DataBookings | null;
  error: null | string;
}

const initialState: StateBooking = {
  status: "idle",
  dataBooking: [],
  singleBooking: null,
  error: null,
};

export const bookingsSlice = createSlice({
  name: "bookingSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchAllThunk.fulfilled,
        (state, action: PayloadAction<DataBookings[]>) => {
          state.status = "fulfilled";
          state.dataBooking = action.payload;
        }
      )
      .addCase(
        fetchSingleThunk.fulfilled,
        (state, action: PayloadAction<DataBookings | undefined>) => {
          state.status = "fulfilled";
          state.singleBooking = action.payload ?? null;
        }
      )
      .addCase(
        deleteThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.dataBooking = state.dataBooking.filter(
            (item) => item._id !== action.payload
          );
        }
      );
    // .addCase(createThunk.fulfilled, (state, action) => {
    //   state.dataBooking.push(action.payload);
    // })
    // .addCase(updateThunk.fulfilled, (state, action) => {
    //   const index = state.dataBooking.findIndex(
    //     (booking) => booking._id === action.payload._id
    //   );
    //   if (index !== -1) {
    //     state.dataBooking[index] = action.payload;
    //   }
    // });
  },
});

export default bookingsSlice.reducer;
