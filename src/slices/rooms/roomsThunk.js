import { createAsyncThunk } from "@reduxjs/toolkit";
import roomsJson from "../../../dbRooms.json";
import { delay } from "../../utils";

export const fetchAllThunk = createAsyncThunk("rooms/fetchAll", async () => {
  return await delay(roomsJson);
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
