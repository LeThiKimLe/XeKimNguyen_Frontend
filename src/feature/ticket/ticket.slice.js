import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    currentTicket: null,
    active: 1,
    loading: false,
    message:'',
    error: false
}

const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers:{
        setActive: (state, action) => {
            const {active} = action.payload
            state.active = active
        },
        setMessage: (state, action) => {
            state.message = action.payload.message
            state.error = action.payload.error
        },
        reset: (state) => {
            state.message = ''
            state.error = false
        },
        setCurrentTicket : (state, action) => {
            state.currentTicket = action.payload
        }
    }
})

export const selectActive = (state) => state.ticket.active
export const selectMessage = (state) => state.ticket.message
export const selectError = (state) => state.ticket.error
export const selectCurrentTicket = (state) => state.ticket.currentTicket

export const ticketAction = ticketSlice.actions;

export default ticketSlice.reducer