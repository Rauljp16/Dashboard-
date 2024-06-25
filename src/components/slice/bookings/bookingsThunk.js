import { createAsyncThunk } from "@reduxjs/toolkit";
import bookingJson from "../../../../booking.json";

const dataBooking = bookingJson

export const fetchAllThunk = createAsyncThunk(
    'bookings/fetchAll',
    async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(dataBooking);
        }, 200);
    });
}
);

    //   export const fetchOneThunk = createAsyncThunk(
    //     'bookings/fetchOne',
    //     async (id) => {
    //       return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //           const item = dataBooking.find(item => item.id === id);
    //           if (item) {
    //             resolve(item);
    //           } else {
    //             reject(new Error(`No se encontró ningún elemento con id ${id}`));
    //           }
    //         }, 200);
    //       });
    //     }
    //   );

export const createThunk = createAsyncThunk()
export const updateThunk = createAsyncThunk()
export const deleteThunk = createAsyncThunk()