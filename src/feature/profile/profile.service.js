import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosClient from "../../api/axios"

const updateProfile = createAsyncThunk('profile/update', async ({updatedInfor}, thunkAPI) => {
    try{
        const response = await axiosClient.post('user/edit',
                                            { tel: updatedInfor.tel,
                                              name: updatedInfor.name,
                                              email: updatedInfor.email,
                                              address: updatedInfor.address,
                                              img: updatedInfor.img,
                                              gender: updatedInfor.gender.value
                                            })
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

const profileThunk = {
    updateProfile
}

export default profileThunk