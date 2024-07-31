import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendApiCall } from "../../utils";
import { DataRooms } from "../../types/global";


export const fetchAllThunk = createAsyncThunk("rooms/fetchAll", async () => {
  try {
    const data = await backendApiCall("rooms", "GET");
    return data.rooms;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al obtener datos:", error.message);
      return Promise.reject(error.message);
    }
  }
});

// export const fetchSingleThunk = createAsyncThunk<DataRooms | undefined, string>(
//   "rooms/fetchSingle",
// (id) => {
// return roomsJson.find((item) => item.id === id);
//}
//);

export const deleteThunk = createAsyncThunk<string, string>("rooms/delete", (_id) => {
  return _id;
});
// export const createThunk = createAsyncThunk();
// export const updateThunk = createAsyncThunk();
