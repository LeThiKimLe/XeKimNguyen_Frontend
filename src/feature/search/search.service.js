import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axios";
import { parse, format } from 'date-fns';

const getTrips = createAsyncThunk('search/trip', async (searchInfor, thunkAPI) => {
    try {
        const response = await axiosClient.get('trips', {
            params: {
                "routeId": searchInfor.searchRoute.id,
                "availability": searchInfor.numberTicket,
                "departDate": format(parse(searchInfor.departDate, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd'),
                "turn": searchInfor.turn
            }
        })
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

const searchThunk = {
    getTrips
}

export default searchThunk