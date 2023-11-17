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

const changeTicket = createAsyncThunk('tickets/change', async ({bookingCode, listChange, listNew, newScheduleId}, thunkAPI) => {
    try {
        const response = await axiosClient.post('tickets/change',
        {
            "bookingCode": bookingCode,
            "numberTicket": listChange.length,
            "tickets": listChange.map((ticket, index) => {
                return {
                    ticketId: ticket.id,
                    newSeatName: listNew[index]
                }
            }),
            "newScheduleId": newScheduleId
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

const editTicket = createAsyncThunk('tickets/edit', async ({bookingCode, pickStationId, dropStationId}, thunkAPI) => {
    try {
        const response = await axiosClient.put('tickets/edit',
            {
                "bookingCodeId": bookingCode,
                "pickStationId": pickStationId,
                "dropStatationId": dropStationId
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
    verifyCancelTicketPolicy,
    changeTicket,
    editTicket
}

export default ticketThunk