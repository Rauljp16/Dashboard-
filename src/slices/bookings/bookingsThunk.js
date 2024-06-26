import { createAsyncThunk } from "@reduxjs/toolkit";
import bookingJson from "../../../booking.json";
import { delay } from "../../utils";

export const fetchAllThunk = createAsyncThunk("bookings/fetchAll", async () => {
  return await delay(bookingJson);
});

export const fetchSingleThunk = createAsyncThunk(
  "bookings/fetchSingle",
  async () => {
    return await delay(bookingJson);
  }
);

export const createThunk = createAsyncThunk();
export const updateThunk = createAsyncThunk();
export const deleteThunk = createAsyncThunk();
