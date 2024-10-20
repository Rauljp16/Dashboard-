import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createThunk,
  deleteThunk,
  fetchAllThunk,
  fetchSingleThunk,
  updateThunk,
} from "./roomsThunk";
import { DataRooms } from "../../types/global";

interface StateRoom {
  status: string;
  dataRoom: DataRooms[];
  singleRoom: DataRooms | null;
  error: null | string;
}

const initialState: StateRoom = {
  status: "idle",
  dataRoom: [],
  singleRoom: null,
  error: null,
};

export const roomsSlice = createSlice({
  name: "roomSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchAllThunk.fulfilled,
        (state, action: PayloadAction<DataRooms[]>) => {
          state.status = "fulfilled";
          state.dataRoom = action.payload;
        }
      )
      .addCase(
        deleteThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.dataRoom = state.dataRoom.filter(
            (item) => item._id !== action.payload
          );
        }
      )
      .addCase(fetchSingleThunk.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.singleRoom = action.payload ?? null;
      });
  },
});
