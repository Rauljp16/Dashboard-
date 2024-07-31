import { createAsyncThunk } from "@reduxjs/toolkit";
import contactJson from "../../../data/dbContact.json";
import { delay } from "../../utils";
import { DataContacts } from '../../types/global';

export const fetchAllThunk = createAsyncThunk<DataContacts[]>(
  "contact/fetchAll",
  async () => {
    const data = await delay(contactJson);
    return data as DataContacts[];
  });

export const fetchSingleThunk = createAsyncThunk<DataContacts | undefined, string>(
  "contact/fetchSingle",
  (id) => {
    return contactJson.find((item) => item.id === id);
  }
);

export const deleteThunk = createAsyncThunk<string, string>("contact/delete", (id) => {
  id.toString
  return id;
});
// export const createThunk = createAsyncThunk();
// export const updateThunk = createAsyncThunk();
