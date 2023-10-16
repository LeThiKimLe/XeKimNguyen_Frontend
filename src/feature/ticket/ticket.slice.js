import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    active: 1,
    loading: false
}

const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers:{
        setActive: (state, action) => {
            const {active} = action.payload
            state.active = active
        },
    }
})

export const selectActive = (state) => state.ticket.active

export const ticketAction = ticketSlice.actions;

export default ticketSlice.reducer