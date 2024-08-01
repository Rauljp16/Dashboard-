import { createAsyncThunk } from "@reduxjs/toolkit";
import { DataContacts } from '../../types/global';
import { backendApiCall } from "../../utils";

export const fetchAllThunk = createAsyncThunk<DataContacts[]>(
  "contact/fetchAll",
  async () => {
    try {
      const data = await backendApiCall("contact", "GET");
      return data.contact;
    } catch (error) {
      if (error instanceof Error) {

        console.error("Error al obtener datos:", error.message);
        return Promise.reject(error.message);
      }
    }
  });

// export const fetchSingleThunk = createAsyncThunk<DataContacts | undefined, string>(
//   "contact/fetchSingle",
//   (id) => {
//     return contactJson.find((item) => item.id === id);
//   }
// );

export const deleteThunk = createAsyncThunk<string, string>(
  "contact/delete",
  (_id) => {
    _id.toString
    return _id;
  }
);
// export const createThunk = createAsyncThunk();
// export const updateThunk = createAsyncThunk();
