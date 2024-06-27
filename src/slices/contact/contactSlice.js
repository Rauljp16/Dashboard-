import { createSlice } from "@reduxjs/toolkit";
import {
  createThunk,
  deleteThunk,
  fetchAllThunk,
  fetchSingleThunk,
  updateThunk,
} from "./contactThunk";

export const contactSlice = createSlice({
  name: "contactSlice",
  initialState: {
    status: "idle",
    dataContact: [],
    singleUser: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllThunk.fulfilled, (state, action) => {
        if (!state.dataContact.length) {
          state.status = "fulfilled";
          state.dataContact = action.payload;
        }
      })
      .addCase(fetchSingleThunk.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.dataContact = action.payload;
      })
      .addCase(deleteThunk.fulfilled, (state, action) => {
        state.dataContact = state.dataContact.filter(
          (item) => item.id !== action.payload
        );
      });
    //   .addCase(createThunk.fulfilled, (state, action) => {
    //     state.dataContact.push(action.payload);
    //   })
    //   .addCase(updateThunk.fulfilled, (state, action) => {
    //     const index = state.data.findIndex(
    //       (post) => post.id === action.payload.id
    //     );
    //     state.dataContact[index] = action.payload;
    //   })
  },
});
