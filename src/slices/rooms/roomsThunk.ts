import { createAsyncThunk } from "@reduxjs/toolkit";
import roomsJson from "../../../dbRooms.json";
import { delay } from "../../utils";
import { DataRooms } from "../../types/global";

export const fetchAllThunk = createAsyncThunk<DataRooms[]>(
  "rooms/fetchAll",
  async () => {
    const data = await delay(roomsJson);
    return data as DataRooms[];
});

export const fetchSingleThunk = createAsyncThunk<DataRooms | undefined, string>(
  "rooms/fetchSingle",
  (id) => {
    return roomsJson.find((item) => item.id === id);
  }
);

export const deleteThunk = createAsyncThunk<string,string>("rooms/delete", (id) => {
  return id;
});
// export const createThunk = createAsyncThunk();
// export const updateThunk = createAsyncThunk();
