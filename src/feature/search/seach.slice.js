import { createSlice } from "@reduxjs/toolkit";
import format from "date-fns/format";

const initialState = {
    seachRoute: null,
    departDate: format(new Date(), 'dd/MM/yyyy'),
    numberTicket: 1,
    turn: 1,
    oneway: true,
    arrivalDate: format(new Date(), 'dd/MM/yyyy'),
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers:{
        setSearch: (state, action) => {
            const {propName, propValue} = action.payload
            state[propName] = propValue
        },
    }
})

export const selectSearchInfor = (state) => state.search

export const searchAction = searchSlice.actions;

export default searchSlice.reducer