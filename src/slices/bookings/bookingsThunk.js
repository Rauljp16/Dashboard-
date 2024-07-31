import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendApiCall, delay } from "../../utils";

export const fetchAllThunk = createAsyncThunk("bookings/fetchAll", async () => {
  try {
    const data = await backendApiCall("bookings", "GET");
    return data.bookings;
  } catch (error) {
    console.error("Error al obtener datos:", error.message);
    return Promise.reject(error.message);
  }
});

export const fetchSingleThunk = createAsyncThunk(
  "bookings/fetchSingle",
  (_id) => {
    return bookingJson.find((item) => item._id === _id);
  }
);

export const deleteThunk = createAsyncThunk("bookings/delete", (_id) => {
  return _id;
});
export const createThunk = createAsyncThunk();
export const updateThunk = createAsyncThunk();
