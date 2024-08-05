import { createAsyncThunk } from "@reduxjs/toolkit";
import { DataUsers } from "../../types/global";
import { backendApiCall } from "../../utils";

export const fetchAllThunk = createAsyncThunk<DataUsers[]>(
  "users/fetchAll",
  async () => {
    try {
      const data = await backendApiCall("users", "GET");
      return data.users;
    } catch (error) {
      if (error instanceof Error) {

        console.error("Error al obtener datos:", error.message);
        return Promise.reject(error.message);
      }
    }
  });

export const fetchSingleThunk = createAsyncThunk<DataUsers | undefined, string>(
  "users/fetchSingle",
  async (_id) => {
    try {
      const data = await backendApiCall(`users/${_id}`, "GET");
      return data.users;
    } catch (error) {
      if (error instanceof Error) {

        console.error("Error al obtener datos:", error.message);
        return Promise.reject(error.message);
      }
    }
  });


export const deleteThunk = createAsyncThunk<string, string>(
  "users/delete",
  async (_id) => {
    try {
      const data = await backendApiCall(`users/${_id}`, "DELETE");
      return data.users;
    } catch (error) {
      if (error instanceof Error) {

        console.error("Error al eliminar usuario:", error.message);
        return Promise.reject(error.message);
      }
    }
  });

export const createThunk = createAsyncThunk<DataUsers, DataUsers>(
  "users/create",
  async (dataUser) => {
    try {
      const data = await backendApiCall("users", "POST", dataUser);
      return data.users;
    } catch (error) {
      if (error instanceof Error) {

        console.error("Error al crear usuario:", error.message);
        return Promise.reject(error.message);
      }
    }
  });

export const updateThunk = createAsyncThunk<string, string>(
  "users/update",
  async (_id, dataUser) => {
    try {
      const data = await backendApiCall(`users/${_id}`, "PATCH", dataUser);
      return data.users;
    } catch (error) {
      if (error instanceof Error) {

        console.error("Error al crear usuario:", error.message);
        return Promise.reject(error.message);
      }
    }
  });
