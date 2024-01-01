import { createSlice } from "@reduxjs/toolkit";
import format from "date-fns/format";
import storage from 'redux-persist/lib/storage';
import { persistReducer, createTransform } from 'redux-persist';
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import searchThunk from "./search.service";
import parse from "date-fns/parse";

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
        message: '',
        listTrip: []
    },
    listDeparture: [],
    listDestination: [],
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            const searchInfor = action.payload
            state.infor = searchInfor
        },
        resetRoute: (state) => {
            state.infor.searchRoute = null
            state.infor.desLocation = null
        },
        resetResult: (state) => {
            state.result = {
                message: '',
                listTrip: []
            }
        },
        setListDeparture: (state, action) => {
            state.listDeparture = action.payload
        },
        setListDestination: (state, action) => {
            state.listDestination = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchThunk.getTrips.fulfilled, (state, action) => {
                const listSchedule = []
                const listTrip = action.payload
                listTrip.forEach((trip) => {
                    const { schedules, ...tripInfor } = trip
                    schedules.forEach((schedule) => {
                        listSchedule.push({
                            ...schedule,
                            tripInfor: tripInfor
                        })
                    })
                })
                state.result.listTrip = listSchedule
            })
            .addCase(searchThunk.getTrips.rejected, (state, action) => {
                state.result.message = action.payload
                state.result.listTrip = []
            })
            .addCase(searchThunk.getSameTrips.fulfilled, (state, action) => {

                const listSchedule = []
                const trip = action.payload
                const { schedules, ...tripInfor } = trip
                schedules.forEach((schedule) => {
                    listSchedule.push({
                        ...schedule,
                        tripInfor: tripInfor
                    })
                })
                state.result.listTrip = listSchedule
            })
            .addCase(searchThunk.getSameTrips.rejected, (state, action) => {
                state.result.message = action.payload
                state.result.listTrip = []
            })
    }
})

export const selectSearchInfor = (state) => state.search.infor
export const selectRearchResult = (state) => state.search.result.listTrip
export const selectListDeparture = (state) => state.search.listDeparture
export const selectListDestination = (state) => state.search.listDestination
export const searchAction = searchSlice.actions;

const dateTransform = createTransform(
  (inboundState) => {
    // Kiểm tra và cập nhật lại giá trị ngày của thông tin từ storage
    const currentDate = new Date();
    if (inboundState && typeof inboundState === 'object' && inboundState.search && inboundState.search.infor && parse(inboundState.search.infor.departDate, 'dd/MM/yyyy', new Date()) < currentDate) {
      inboundState.search.infor.departDate = format(currentDate, 'dd/MM/yyyy')
    }
    return inboundState;
  },
  // Transform state coming from storage, on its way to be rehydrated into redux
  (outboundState) => {
    return outboundState;
  }
);

const searchPersistConfig = {
    key: 'search',
    storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['infor'],
    transforms: [dateTransform]
}

const searchReducer = persistReducer(searchPersistConfig, searchSlice.reducer)

export default searchReducer