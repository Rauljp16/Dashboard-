import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendApiCall } from "../../utils";
import { DataBookings } from "../../types/global";

export const fetchAllThunk = createAsyncThunk<DataBookings[]>(
  "bookings/fetchAll",
  async () => {
    try {
      const data = await backendApiCall("bookings", "GET");
      return data.bookings;
    } catch (error) {
      if (error instanceof Error) {

        console.error("Error al obtener datos:", error.message);
        return Promise.reject(error.message);
      }
    }
  });

export const fetchSingleThunk = createAsyncThunk<DataBookings | undefined, string>(
  "bookings/fetchSingle",
  async (_id) => {
    try {
      const data = await backendApiCall(`bookings/${_id}`, "GET");
      return data.booking;
    } catch (error) {
      if (error instanceof Error) {

        console.error("Error al obtener datos:", error.message);
        return Promise.reject(error.message);
      }
    }
  });



//export const fetchSingleThunk = createAsyncThunk<DataBookings | undefined, string>(
//"bookings/fetchSingle",
//(_id) => {
//console.log(_id);
// try {
//   const data = await backendApiCall("bookings", "GET");
//   return data.booking;
// } catch (error) {
//   if (error instanceof Error) {

//     console.error("Error al obtener datos:", error.message);
//     return Promise.reject(error.message);
//   }
// }
//}
//);

export const deleteThunk = createAsyncThunk<string, string>(
  "bookings/delete",
  (_id) => {
    _id.toString
    return _id;
  }
);

// export const createThunk = createAsyncThunk();
// export const updateThunk = createAsyncThunk();
