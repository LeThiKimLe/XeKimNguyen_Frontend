import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosClient from "../../api/axios"

const login = createAsyncThunk('auth/login', async ({username, password}, thunkAPI) => {
    try{
        const response = await axiosClient.post('auth/login', {username, password})
        localStorage.setItem("current_user", JSON.stringify(response))
        return response
    }
    catch (error){
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue(message);
    }
} 
)

const logout = createAsyncThunk('auth/logout', async (thunkAPI) => {
    try{
        localStorage.removeItem("current_user")
        const response = await axiosClient.post('auth/logout')      
        return response
    }
    catch(error){
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
const register = createAsyncThunk('auth/signup', async({tel, name, email, password}, thunkAPI) => {
    try{
        const response = await axiosClient.post('auth/signup', {tel, name, email, password, gender:true})
        return response
    }
    catch (error){
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue(message);
    }
    }
)

const getOTP = createAsyncThunk('auth/get-otp', async(telno, thunkAPI) => {
    try{
        const response = await axiosClient.get('auth/get-otp', {telno})
        return response
    }
    catch(error){
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}) 

const validateOTP = createAsyncThunk('auth/verify-otp', async({telno, otp}, thunkAPI) => {
    try{
        const response = await axiosClient.get('auth/verify-otp', {telno, otp})
        return response
    }
    catch(error){
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

const updateProfile = createAsyncThunk('auth/edit-account', async({name, address, email, img, gender}, thunkAPI) => {
    try{
        const response = await axiosClient.post('account/edit', {name, address, email, img, gender})
        localStorage.setItem("current_user", JSON.stringify(response.user))
        return response
    }
    catch(error){
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

const authThunk = {
    register,
    login,
    logout,
    getOTP,
    validateOTP,
    updateProfile
}

export default authThunk