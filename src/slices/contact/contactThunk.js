import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendApiCall, delay } from "../../utils";

export const fetchAllThunk = createAsyncThunk("contact/fetchAll", async () => {
  try {
    const data = await backendApiCall("contact", "GET");
    return data.contact;
  } catch (error) {
    console.error("Error al obtener datos:", error.message);
    return Promise.reject(error.message);
  }
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
