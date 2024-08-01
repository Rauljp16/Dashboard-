import { createAsyncThunk } from "@reduxjs/toolkit";
import { DataUsers } from "../../types/global";
import { backendApiCall } from "../../utils";

export const fetchAllThunk = createAsyncThunk<DataUsers[]>(
  "users/fetchAll",
  async () => {
    try {
      const data = await backendApiCall("users", "GET");
      return data.users;
    } catch (error) {
      if (error instanceof Error) {

        console.error("Error al obtener datos:", error.message);
        return Promise.reject(error.message);
      }
    }
  });

export const fetchSingleThunk = createAsyncThunk<DataUsers | undefined, string>(
  "users/fetchSingle",
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


export const deleteThunk = createAsyncThunk<string, string>(
  "users/delete",
  (_id) => {
    _id.toString
    return _id;
  }
);
// export const createThunk = createAsyncThunk();
// export const updateThunk = createAsyncThunk();
