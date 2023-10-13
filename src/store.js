
import { configureStore } from "@reduxjs/toolkit";
import authReducer from './feature/auth/auth.slice'
import profileReducer from './feature/profile/profile.slice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer
  }
})

export default store;