import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createThunk,
  deleteThunk,
  fetchAllThunk,
  fetchSingleThunk,
  updateThunk,
} from "./usersThunk";

import { DataUsers } from "../../types/global";

interface StateUser {
  status: string;
  dataUser: DataUsers[];
  singleUser: DataUsers | null;
  error: null | string;
}

const initialState: StateUser = {
  status: "idle",
  dataUser: [],
  singleUser: null,
  error: null,
};

export const usersSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchAllThunk.fulfilled,
        (state, action: PayloadAction<DataUsers[]>) => {
          state.status = "fulfilled";
          state.dataUser = action.payload;
        }
      )
      .addCase(
        fetchSingleThunk.fulfilled,
        (state, action: PayloadAction<DataUsers | undefined>) => {
          state.status = "fulfilled";
          state.singleUser = action.payload ?? null;
        }
      )
      .addCase(
        deleteThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.dataUser = state.dataUser.filter(
            (item) => item._id !== action.payload
          );
        }
      );
  },
});
