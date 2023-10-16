
import { configureStore } from "@reduxjs/toolkit";
import authReducer from './feature/auth/auth.slice'
import profileReducer from './feature/profile/profile.slice'
import searchReducer from './feature/search/seach.slice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    search: searchReducer
  }
})

export default store;