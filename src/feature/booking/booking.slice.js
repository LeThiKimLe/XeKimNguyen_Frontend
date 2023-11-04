import { createSlice } from "@reduxjs/toolkit";
import bookingThunk from "./booking.service";

const initialState = {
    bookingInfor: null,
    loading: false,
    message: '',
    bookingSessionTime: null,
    error: false
}

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        saveInfor: (state, action) => {
            state.bookingInfor= action.payload
        },
        reset: (state) => {
            state.bookingInfor = null
            state.loading = false
            state.message = ''
            state.error = false
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(bookingThunk.bookingForGuest.pending, (state) => {
            state.loading = true
        })
        .addCase(bookingThunk.bookingForGuest.fulfilled, (state, action) => {
            state.loading = false
            state.message = action.payload.message || "Đã đặt giữ chỗ thành công"
            // state.bookingSessionTime = action.payload.bookingDate
            state.error = false
        })
        .addCase(bookingThunk.bookingForGuest.rejected, (state, action) => {
            state.error = true
            state.loading = false
            state.message = action.payload
        })
        .addCase(bookingThunk.bookingForUser.pending, (state) => {
            state.loading = true
        })
        .addCase(bookingThunk.bookingForUser.fulfilled, (state, action) => {
            state.loading = false
            state.message = action.payload.message || "Đã đặt giữ chỗ thành công"
            // state.bookingSessionTime = action.payload.bookingDate
            state.error = false
        })
        .addCase(bookingThunk.bookingForUser.rejected, (state, action) => {
            state.error = true
            state.loading = false
            state.message = action.payload
        })
    }
})

export const bookingActions = bookingSlice.actions

export const selectLoading = state => state.booking.loading
export const selectMessage = state => state.booking.message
export const selectError = state => state.booking.error
export const selectBookingInfor = state => state.booking.bookingInfor
export const selectBookingSessionTime = state => state.booking.bookingSessionTime

export default bookingSlice.reducer
