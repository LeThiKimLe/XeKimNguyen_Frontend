import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentTrip: null
}

const tripSlice = createSlice({
    name: 'trip',
    initialState,
    reducers: {
        getCurTrip: (state, action) => {
            state.currentTrip = action.payload
        }
    }
}
)

export const tripActions = tripSlice.actions

export const selectCurrentTrip = state => state.trip.currentTrip

export default tripSlice.reducer