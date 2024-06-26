import { createSlice } from "@reduxjs/toolkit";
import {
  createThunk,
  deleteThunk,
  fetchAllThunk,
  fetchSingleThunk,
  updateThunk,
} from "./roomsThunk";

export const roomsSlice = createSlice({
  name: "roomSlice",
  initialState: {
    status: "idle",
    dataRoom: [],
    singleRoom: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllThunk.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.dataRoom = action.payload;
      })
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
    //   .addCase(deleteThunk.fulfilled, (state, action) => {
    //     state.dataRoom = state.data.filter(
    //       (post) => post.id !== action.payload
    //     );
    //   });
  },
});
