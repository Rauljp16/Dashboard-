import { createSlice } from "@reduxjs/toolkit";
import {
  createThunk,
  deleteThunk,
  fetchAllThunk,
  fetchSingleThunk,
  updateThunk,
} from "./usersThunk";

export const usersSlice = createSlice({
  name: "userSlice",
  initialState: {
    status: "idle",
    dataUser: [],
    singleUser: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllThunk.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.dataUser = action.payload;
      })
      .addCase(fetchSingleThunk.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.dataUser = action.payload;
      });
    //   .addCase(createThunk.fulfilled, (state, action) => {
    //     state.dataUser.push(action.payload);
    //   })
    //   .addCase(updateThunk.fulfilled, (state, action) => {
    //     const index = state.data.findIndex(
    //       (post) => post.id === action.payload.id
    //     );
    //     state.dataUser[index] = action.payload;
    //   })
    //   .addCase(deleteThunk.fulfilled, (state, action) => {
    //     state.dataUser = state.data.filter(
    //       (post) => post.id !== action.payload
    //     );
    //   });
  },
});
