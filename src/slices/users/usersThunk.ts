import { createAsyncThunk } from "@reduxjs/toolkit";
import usersJson from "../../../dbUsers.json";
import { delay } from "../../utils";
import { DataUsers } from "../../types/global";

export const fetchAllThunk = createAsyncThunk<DataUsers[]>("users/fetchAll", async () => {
  const data = await delay(usersJson);
  return data as DataUsers[]
});

export const fetchSingleThunk = createAsyncThunk<DataUsers| undefined, string>(
  "users/fetchSingle",
  (id) => {
    return usersJson.find((item) => item.id === id);
  }
);

export const deleteThunk = createAsyncThunk<string, string>("users/delete", (id) => {
  return id;
});
// export const createThunk = createAsyncThunk();
// export const updateThunk = createAsyncThunk();
