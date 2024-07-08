import { createAsyncThunk } from "@reduxjs/toolkit";
import bookingJson from "../../../booking.json";
import { delay } from "../../utils";

export const fetchAllThunk = createAsyncThunk("bookings/fetchAll", async () => {
  return await delay(bookingJson);
});

export const fetchSingleThunk = createAsyncThunk(
  "bookings/fetchSingle",
  (id) => {
    return bookingJson.find((item) => item.id === id);
  }
);

export const deleteThunk = createAsyncThunk("bookings/delete", (id) => {
  return id;
});
export const createThunk = createAsyncThunk();
export const updateThunk = createAsyncThunk();
