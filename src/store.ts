import { configureStore } from "@reduxjs/toolkit";
import { bookingsSlice } from "./slices/bookings/bookingsSlice";
import { roomsSlice } from "./slices/rooms/roomsSlice";
import { contactSlice } from "./slices/contact/contactSlice";
import { usersSlice } from "./slices/users/usersSlice";

export const store = configureStore({
  reducer: {
    bookingSlice: bookingsSlice.reducer,
    roomSlice: roomsSlice.reducer,
    contactSlice: contactSlice.reducer,
    userSlice: usersSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
