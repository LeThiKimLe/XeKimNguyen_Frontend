import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    currentTicket: null,
    active: 1,
    loading: false,
    message:'',
    error: false,
    process: 1,
    finishAction: false
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
            state.process = 1
            state.finishAction = false
        },
        setCurrentTicket : (state, action) => {
            state.currentTicket = action.payload
        },
        comeBackward: (state) => {
            if (state.process > 1)
                state.process = state.process - 1
        },
        comeForward: (state) => {
            state.process = state.process + 1
        },
        finishAction: (state) => {
            state.finishAction = true
        }
    }
})

export const selectActive = (state) => state.ticket.active
export const selectMessage = (state) => state.ticket.message
export const selectError = (state) => state.ticket.error
export const selectCurrentTicket = (state) => state.ticket.currentTicket
export const selectProcess = (state) => state.ticket.process
export const selectFinishedState = (state) => state.ticket.finishAction

export const ticketAction = ticketSlice.actions;

export default ticketSlice.reducer