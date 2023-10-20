
import { configureStore } from "@reduxjs/toolkit";
import authReducer from './feature/auth/auth.slice'
import profileReducer from './feature/profile/profile.slice'
import searchReducer from './feature/search/seach.slice'
import ticketReducer from "./feature/ticket/ticket.slice";
import routeReducer from './feature/route/route.slice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    search: searchReducer,
    ticket: ticketReducer,
    route: routeReducer
  }
})

export default store;