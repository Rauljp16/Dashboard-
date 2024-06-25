import { createSlice } from "@reduxjs/toolkit";
import { createThunk, deleteThunk, fetchAllThunk, updateThunk} from "./bookingsThunk"

export const bookingsSlice = createSlice({
    name:"bookingSlice",
    initialState:{
        status: "idle",
        dataBooking:[],
        // error: null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllThunk.fulfilled, (state,action) =>{
            state.status = "fulfilled"
            state.dataBooking = action.payload
        })
        // .addCase(createThunk.fulfilled, (state, action) => {
        //     state.bookings.push(action.payload);
        //   })
        //   .addCase(updateThunk.fulfilled, (state, action) => {
        //     const index = state.data.findIndex((post) => post.id === action.payload.id);
        //     state.bookings[index] = action.payload;
        //   })
        //   .addCase(deleteThunk.fulfilled, (state, action) => {
        //     state.bookings = state.data.filter((post) => post.id !== action.payload);
        //   });
    }

})