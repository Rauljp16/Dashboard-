import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createThunk,
  deleteThunk,
  fetchAllThunk,
  fetchSingleThunk,
  updateThunk,
} from "./contactThunk";
import { DataContacts } from '../../types/global';

interface StateContact {
  status: string;
  dataContact: DataContacts[];
  singleContact: DataContacts | null;
  error: null | string;
}

const initialState: StateContact = {
  status: "idle",
  dataContact: [],
  singleContact: null,
  error: null,
};

export const contactSlice = createSlice({
  name: "contactSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllThunk.fulfilled, (state, action: PayloadAction<DataContacts[]>) => {
        if (!state.dataContact.length) {
          state.status = "fulfilled";
          state.dataContact = action.payload;
        }
      })
      .addCase(fetchSingleThunk.fulfilled, (state, action: PayloadAction<DataContacts | undefined>) => {
        state.status = "fulfilled";
        state.singleContact = action.payload ?? null;
      })
      .addCase(deleteThunk.fulfilled, (state, action: PayloadAction<string>) => {
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
