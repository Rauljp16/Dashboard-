import { createAsyncThunk } from "@reduxjs/toolkit";
import contactJson from "../../../dbContact.json";
import { delay } from "../../utils";

export const fetchAllThunk = createAsyncThunk("contact/fetchAll", async () => {
  return await delay(contactJson);
});

export const fetchSingleThunk = createAsyncThunk(
  "contact/fetchSingle",
  async () => {
    return await delay(contactJson);
  }
);

export const deleteThunk = createAsyncThunk("contact/delete", (id) => {
  return id;
});
export const createThunk = createAsyncThunk();
export const updateThunk = createAsyncThunk();
