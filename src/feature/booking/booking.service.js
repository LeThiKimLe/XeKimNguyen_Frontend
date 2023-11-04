import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axios";

const bookingForGuest = createAsyncThunk('bookings-guest', async (bookingInfor, thunkAPI) => {
    try {
        const response = await axiosClient.post('bookings/booking-guest',
            { 
                ticketNumber: bookingInfor.bookedSeat.length,
                name: bookingInfor.bookingUser.name,
                email: bookingInfor.bookingUser.email,
                tel: bookingInfor.bookingUser.tel,
                tripId: bookingInfor.bookingTrip.tripInfor.id,
                scheduleId: bookingInfor.bookingTrip.id,
                pickStationId: bookingInfor.pickPoint,
                dropStationId: bookingInfor.dropPoint,
                seatName: bookingInfor.bookedSeat
            }
        )
        return response
    }
    catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}
)

const bookingForUser = createAsyncThunk('bookings-user', async (bookingInfor, thunkAPI) => {
    try {
        const response = await axiosClient.post('bookings/booking-users',
            { 
                ticketNumber: bookingInfor.bookedSeat.length,
                name: bookingInfor.bookingUser.name,
                email: bookingInfor.bookingUser.email,
                tel: bookingInfor.bookingUser.tel,
                tripId: bookingInfor.bookingTrip.tripInfor.id,
                scheduleId: bookingInfor.bookingTrip.id,
                pickStationId: bookingInfor.pickPoint,
                dropStationId: bookingInfor.dropPoint,
                seatName: bookingInfor.bookedSeat
            }
        )
        return response
    }
    catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}
)

const getBookingInfor = createAsyncThunk('bookings/tickets', async ({searchInfor, captcha}, thunkAPI) => {
    try {
        const response = await axiosClient.post('bookings/tickets',{
            params: { 
                tel: searchInfor.tel,
                bookingCode: searchInfor.booking_code,
                token: captcha                
            }
        }
        )
        return response
    }
    catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}
)


const bookingThunk = {
    bookingForGuest,
    bookingForUser,
    getBookingInfor
}

export default bookingThunk


