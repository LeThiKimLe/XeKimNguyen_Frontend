import routeThunk from "./route.service";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listRoute:[],
}

const routeSlice = createSlice({
    name: 'route',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(routeThunk.getRoute.fulfilled, (state, action) => {
                state.listRoute = action.payload
            })
    }
})

export const selectListRoute = state => state.route.listRoute

export default routeSlice.reducer