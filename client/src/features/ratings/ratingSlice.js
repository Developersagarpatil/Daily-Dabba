import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ratingService from "./ratingService";

const ratingSlice = createSlice({
    name : 'rating',
    initialState : {
        ratings : [],
        ratingsLoading : false,
        ratingSuccess : false,
        ratingError : false,
        ratingErrorMessage : ""
    },
    reducers : {},
    extraReducers : builder =>{
        builder
        .addCase(getRatings.pending , (state, action) =>{
            state.ratingsLoading = true
            state.ratingSuccess = false
            state.ratingError = false
        })
        .addCase(getRatings.fulfilled , (state, action) =>{
            state.ratingsLoading = false
            state.ratingSuccess = true
            state.ratings = action.payload
            state.ratingError = false
        })
        .addCase(getRatings.rejected , (state, action) =>{
            state.ratingsLoading = false
            state.ratingSuccess = false
            state.ratingError = true
            state.ratingErrorMessage = action.payload
        })
        .addCase(addRatings.pending , (state, action) =>{
            state.ratingsLoading = true
            state.ratingSuccess = false
            state.ratingError = false
        })
        .addCase(addRatings.fulfilled , (state, action) =>{
            state.ratingsLoading = false
            state.ratingSuccess = true
            state.ratings = [action.payload, ...state.ratings]
            state.ratingError = false
        })
        .addCase(addRatings.rejected , (state, action) =>{
            state.ratingsLoading = false
            state.ratingSuccess = false
            state.ratingError = true
            state.ratingErrorMessage = action.payload
        })
    }
})

export default ratingSlice.reducer

//Get Ratings
export const getRatings = createAsyncThunk("FETCH/RATINGS", async( mid , thunkAPI) =>{
    let token = thunkAPI.getState().auth.user.token;
    try {
        return await ratingService.fetchRatings(mid, token) 
    } catch (error) {
              const message = err.response?.data?.message || err.message;
      return thunkAPI.rejectWithValue(message);
    }
})


//add Ratings
export const addRatings = createAsyncThunk("FETCH/RATING", async( rating , thunkAPI) =>{
    let token = thunkAPI.getState().auth.user.token;
    try {
        return await ratingService.addRating(rating, token) 
    } catch (error) {
              const message = err.response?.data?.message || err.message;
      return thunkAPI.rejectWithValue(message);
    }
})