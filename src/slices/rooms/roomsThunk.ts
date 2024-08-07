import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendApiCall } from "../../utils";
import { DataRooms } from "../../types/global";


export const fetchAllThunk = createAsyncThunk("rooms/fetchAll", async () => {
  try {
    const data = await backendApiCall("rooms", "GET");
    return data.rooms;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al obtener datos:", error.message);
      return Promise.reject(error.message);
    }
  }
});

export const fetchSingleThunk = createAsyncThunk<DataRooms | undefined, string>(
  "rooms/fetchSingle",
  async (_id) => {
    try {
      const data = await backendApiCall(`rooms/${_id}`, "GET");
      return data.rooms;
    } catch (error) {
      if (error instanceof Error) {

        console.error("Error al obtener datos:", error.message);
        return Promise.reject(error.message);
      }
    }
  });


export const deleteThunk = createAsyncThunk<string, string>(
  "rooms/delete",
  async (_id) => {
    try {
      const data = await backendApiCall(`rooms/${_id}`, "DELETE");
      return data.rooms;
    } catch (error) {
      if (error instanceof Error) {

        console.error("Error al eliminar room:", error.message);
        return Promise.reject(error.message);
      }
    }
  });

export const createThunk = createAsyncThunk<DataRooms, DataRooms>(
  "rooms/create",
  async (dataRoom) => {
    try {
      const data = await backendApiCall("rooms", "POST", dataRoom);
      return data.rooms;
    } catch (error) {
      if (error instanceof Error) {

        console.error("Error al crear room:", error.message);
        return Promise.reject(error.message);
      }
    }
  });

export const updateThunk = createAsyncThunk<DataRooms, DataRooms>(
  "rooms/update",
  async (dataRoom) => {
    try {
      const data = await backendApiCall(`rooms/${dataRoom._id}`, "PATCH", dataRoom);
      return data.rooms;
    } catch (error) {
      if (error instanceof Error) {

        console.error("Error al actualizar room:", error.message);
        return Promise.reject(error.message);
      }
    }
  });

