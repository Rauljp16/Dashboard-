import { configureStore } from "@reduxjs/toolkit";
import { bookingsSlice } from "../components/slice/bookings/bookingsSlice";
export const store = configureStore({
reducer:{
    bookingSlice: bookingsSlice.reducer
}
});