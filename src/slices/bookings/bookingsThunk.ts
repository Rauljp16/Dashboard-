import { createAsyncThunk } from "@reduxjs/toolkit";
import bookingJson from "../../../booking.json";
import { delay } from "../../utils";
import { DataBookings } from '../../types/global';


export const fetchAllThunk = createAsyncThunk("bookings/fetchAll", async () => {
  return await delay(bookingJson as DataBookings[]);
});

export const fetchSingleThunk = createAsyncThunk(
  "bookings/fetchSingle",
  (id:string) => {
    return bookingJson.find((item) => item.id === id);
  }
);

export const deleteThunk = createAsyncThunk("bookings/delete", (id) => {
  return id;
});
// export const createThunk = createAsyncThunk();
// export const updateThunk = createAsyncThunk();




