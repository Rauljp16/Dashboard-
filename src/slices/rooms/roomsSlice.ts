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
      .addCase(fetchAllThunk.fulfilled, (state, action: PayloadAction<DataRooms[]>) => {
        if (!state.dataRoom.length) {
          state.status = "fulfilled";
          state.dataRoom = action.payload;
        }
      })
      .addCase(deleteThunk.fulfilled, (state, action:PayloadAction<string>) => {
        state.dataRoom = state.dataRoom.filter(
          (item) => item.id !== action.payload
        );
      });
    // .addCase(fetchSingleThunk.fulfilled, (state, action) => {
    //   state.status = "fulfilled";
    //   state.dataRoom = action.payload;
    // });
    //   .addCase(createThunk.fulfilled, (state, action) => {
    //     state.dataRoom.push(action.payload);
    //   })
    //   .addCase(updateThunk.fulfilled, (state, action) => {
    //     const index = state.data.findIndex(
    //       (post) => post.id === action.payload.id
    //     );
    //     state.dataRoom[index] = action.payload;
    //   })
  },
});
