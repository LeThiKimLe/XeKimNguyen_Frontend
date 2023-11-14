import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axios";


const cancelTicket = createAsyncThunk('tickets/cancel', async ({bookingCode, listCancel}, thunkAPI) => {
    try {
        const response = await axiosClient.post('tickets/cancel',
            {
                "bookingCode": bookingCode,
                "numberTicket": listCancel.length,
                "ticketIdList": listCancel.map((ticket)=> ticket.id)
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
})

const verifyCancelTicketPolicy = createAsyncThunk('tickets/cancel-policy', async ({bookingCode, listCancel}, thunkAPI) => {
    try {
        const response = await axiosClient.post('tickets/cancel-policy',
            {
                "bookingCode": bookingCode,
                "numberTicket": listCancel.length,
                "ticketIdList": listCancel.map((ticket)=> ticket.id)
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
})


const ticketThunk = {
    cancelTicket,
    verifyCancelTicketPolicy
}

export default ticketThunk