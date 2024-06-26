import { createAsyncThunk } from "@reduxjs/toolkit";
import usersJson from "../../../dbUsers.json";
import { delay } from "../../utils";

export const fetchAllThunk = createAsyncThunk("users/fetchAll", async () => {
  return await delay(usersJson);
});

export const fetchSingleThunk = createAsyncThunk(
  "users/fetchSingle",
  async () => {
    return await delay(usersJson);
  }
);

export const createThunk = createAsyncThunk();
export const updateThunk = createAsyncThunk();
export const deleteThunk = createAsyncThunk();
