import { createAsyncThunk } from "@reduxjs/toolkit";
import bookingJson from "../../../booking.json";
import { delay } from "../../utils";
import { DataBookings } from "../../types/global";

export const fetchAllThunk = createAsyncThunk<DataBookings[]>(
  "bookings/fetchAll",
  async () => {
    const data = await delay(bookingJson);
    return data as DataBookings[];
  }
);

export const fetchSingleThunk = createAsyncThunk<DataBookings | undefined, string>(
  "bookings/fetchSingle",
  (id) => {
    return bookingJson.find((item) => item.id === id);
  }
);

export const deleteThunk = createAsyncThunk<string, string>(
  "bookings/delete",
  (id) => {
    id.toString
    return id;
  }
);

// export const createThunk = createAsyncThunk();
// export const updateThunk = createAsyncThunk();
