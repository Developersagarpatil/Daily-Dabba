import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mealService from "./mealService";

const initialState = {
  meals: [],
  meal: {},
  mealLoading: false,
  mealSuccess: false,
  mealError: false,
  mealErrorMessage: "",
};

const mealSlice = createSlice({
  name: "meal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get single meal
      .addCase(getMeal.pending, (state) => {
        state.mealLoading = true;
        state.mealSuccess = false;
        state.mealError = false;
        state.mealErrorMessage = "";
      })
      .addCase(getMeal.fulfilled, (state, action) => {
        state.mealLoading = false;
        state.mealSuccess = true;
        state.meal = action.payload;
        state.mealError = false;
      })
      .addCase(getMeal.rejected, (state, action) => {
        state.mealLoading = false;
        state.mealSuccess = false;
        state.mealError = true;
        state.mealErrorMessage = action.payload;
      })

      // Get all meals
      .addCase(getMeals.pending, (state) => {
        state.mealLoading = true;
        state.mealSuccess = false;
        state.mealError = false;
        state.mealErrorMessage = "";
      })
      .addCase(getMeals.fulfilled, (state, action) => {
        state.mealLoading = false;
        state.mealSuccess = true;
        state.meals = action.payload; // FIX: update meals array
        state.mealError = false;
      })
      .addCase(getMeals.rejected, (state, action) => {
        state.mealLoading = false;
        state.mealSuccess = false;
        state.mealError = true;
        state.mealErrorMessage = action.payload;
      });
  },
});

// Export reducer
export default mealSlice.reducer;

// Thunks
export const getMeal = createAsyncThunk(
  "FETCH/GETMEAL",
  async (mid, thunkAPI) => {
    try {
      return await mealService.fetchMeal(mid);
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getMeals = createAsyncThunk(
  "FETCH/MEALS",
  async (_, thunkAPI) => {
    try {
      return await mealService.fetchMeals(); // FIX: fetch all meals
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
