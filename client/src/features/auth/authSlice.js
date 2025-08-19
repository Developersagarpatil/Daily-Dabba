import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const userExist = JSON.parse(localStorage.getItem('user'))

const authSlice = createSlice({
    name : "auth",
    initialState:{
        user : userExist|| null,
        isLoading : false,
        isSuccess : false,
        isError : false,
        message : ""
    },
    reducers :{},
    extraReducers : builder =>{
        builder
        .addCase(registerUser.pending, (state, action)=>{
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        })
        .addCase(registerUser.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
            state.isError = false
        })
        .addCase(registerUser.rejected, (state, action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.message = action.payload
            state.isError = true
        })
        .addCase(loginUser.pending, (state, action)=>{
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        })
        .addCase(loginUser.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
            state.isError = false
        })
        .addCase(loginUser.rejected, (state, action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.message = action.payload
            state.isError = true
        })
        .addCase(LogOutUser.fulfilled, (state, action)=>{
            state.user = null
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ""
        })
    }
})


export default authSlice.reducer


// register User
export const registerUser = createAsyncThunk("AUTH/REGISTER", async(formData, thunkAPI)=>{
    try {
        return await authService.register(formData)
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

// login User
export const loginUser = createAsyncThunk("AUTH/LOGIN", async(formData, thunkAPI)=>{
    try {
        return await authService.login(formData)
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})


// LogOut User
export const LogOutUser = createAsyncThunk("AUTH/LOGOUT", async()=>{
    localStorage.removeItem('user')
})