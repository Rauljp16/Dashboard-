import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendApiCall, delay } from "../../utils";

export const fetchAllThunk = createAsyncThunk("rooms/fetchAll", async () => {
  try {
    const data = await backendApiCall("rooms", "GET");
    return data.rooms;
  } catch (error) {
    console.error("Error al obtener datos:", error.message);
    return Promise.reject(error.message);
  }
});

export const fetchSingleThunk = createAsyncThunk(
  "rooms/fetchSingle",
  async () => {
    return await delay(roomsJson);
  }
);

export const deleteThunk = createAsyncThunk("rooms/delete", (id) => {
  return id;
});
export const createThunk = createAsyncThunk();
export const updateThunk = createAsyncThunk();
