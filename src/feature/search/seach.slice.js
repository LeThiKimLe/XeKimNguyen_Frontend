import { createSlice } from "@reduxjs/toolkit";
import format from "date-fns/format";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

const initialState = {
    infor: {
        searchRoute: null,
        departDate: format(new Date(), 'dd/MM/yyyy'),
        numberTicket: 1,
        turn: 1,
        oneway: true,
        arrivalDate: format(new Date(), 'dd/MM/yyyy'),
        departLocation: null,
        desLocation: null
    },
    result: {
        listTrip : []
    },
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers:{
        setSearch: (state, action) => {
            const searchInfor = action.payload
            state.infor = searchInfor
        },
        resetRoute: (state) => {
            state.infor.searchRoute = null
            state.infor.desLocation = null
        }
    }
})

export const selectSearchInfor = (state) => state.search.infor
export const selectRearchResult = (state) => state.search.result

export const searchAction = searchSlice.actions;


const searchPersistConfig = {
    key: 'search',
    storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['infor']
}

const searchReducer = persistReducer(searchPersistConfig, searchSlice.reducer)

export default searchReducer