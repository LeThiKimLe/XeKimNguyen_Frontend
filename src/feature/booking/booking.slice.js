import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bookingInfor: null
}

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        saveInfor: (state, action) => {
            state.bookingInfor= action.payload
        }
    }
})

export const bookingActions = bookingSlice.actions

export const selectBookingInfor = state => state.booking.bookingInfor

export default bookingSlice.reducer
