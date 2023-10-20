import { createSlice } from "@reduxjs/toolkit";
import format from "date-fns/format";

const initialState = {
    infor: {
        searchRoute: null,
        departDate: format(new Date(), 'dd/MM/yyyy'),
        numberTicket: 1,
        turn: 1,
        oneway: true,
        arrivalDate: format(new Date(), 'dd/MM/yyyy')
    },
    result: {
        listTrip : []
    }
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers:{
        setSearch: (state, action) => {
            const {propName, propValue} = action.payload
            state.infor[propName] = propValue
        },
        resetRoute: (state) => {
            state.infor.searchRoute = null
        }
    }
})

export const selectSearchInfor = (state) => state.search.infor
export const selectRearchResult = (state) => state.search.result

export const searchAction = searchSlice.actions;

export default searchSlice.reducer