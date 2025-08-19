import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminService from "./adminService";

const initialState = {
  users: [],
  allOrders: [],
  allMeals: [],
  allRatings: [],
  adminLoading: false,
  adminSuccess: false,
  adminError: false,
  adminErrorMessage: "",
  editMeal: {
    meal: {},
    isEdit: false,
  },
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    // ✅ Set meal for editing
    mealEdit: (state, action) => {
      state.editMeal = {
        meal: action.payload,
        isEdit: true,
      };
    },
    // ✅ Reset flags and error message
    resetAdminState: (state) => {
      state.adminLoading = false;
      state.adminSuccess = false;
      state.adminError = false;
      state.adminErrorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Fetch Users
      .addCase(getAllUsers.pending, (state) => {
        state.adminLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminError = true;
        state.adminErrorMessage = action.payload || "Error fetching users.";
      })

      // ✅ Fetch Orders
      .addCase(getAllOrders.pending, (state) => {
        state.adminLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.allOrders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminError = true;
        state.adminErrorMessage = action.payload || "Error fetching orders.";
      })

      // ✅ Fetch Ratings
      .addCase(getAllRatings.pending, (state) => {
        state.adminLoading = true;
      })
      .addCase(getAllRatings.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.allRatings = action.payload;
      })
      .addCase(getAllRatings.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminError = true;
        state.adminErrorMessage = action.payload || "Error fetching ratings.";
      })

      // ✅ Fetch Meals
      .addCase(getAllMeals.pending, (state) => {
        state.adminLoading = true;
      })
      .addCase(getAllMeals.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.allMeals = action.payload;
      })
      .addCase(getAllMeals.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminError = true;
        state.adminErrorMessage = action.payload || "Error fetching meals.";
      })

      // ✅ Add Meal
      .addCase(addMeal.pending, (state) => {
        state.adminLoading = true;
      })
      .addCase(addMeal.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = true;
        state.allMeals.push(action.payload); // Add new meal
      })
      .addCase(addMeal.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminError = true;
        state.adminErrorMessage = action.payload || "Error adding meal.";
      })

      // ✅ Remove Meal
      .addCase(removeMeal.pending, (state) => {
        state.adminLoading = true;
      })
      .addCase(removeMeal.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = true;
        state.allMeals = state.allMeals.filter(
          (meal) => meal._id !== action.payload._id
        );
      })
      .addCase(removeMeal.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminError = true;
        state.adminErrorMessage = action.payload || "Error removing meal.";
      })

      // ✅ Update Meal
      .addCase(updateTheMeal.pending, (state) => {
        state.adminLoading = true;
      })
      .addCase(updateTheMeal.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = true;
        // Replace the updated meal in allMeals array
        state.allMeals = state.allMeals.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
        state.editMeal = { meal: {}, isEdit: false }; // Reset edit state
      })
      .addCase(updateTheMeal.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminError = true;
        state.adminErrorMessage =
          action.payload || "Error updating meal.";
      })
      .addCase(updateTheOrder.pending, (state) => {
        state.adminLoading = true;
      })
      .addCase(updateTheOrder.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = true;
        // Replace the updated meal in allMeals array
        state.allOrders = state.allOrders.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(updateTheOrder.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminError = true;
        state.adminErrorMessage =
          action.payload || "Error updating meal.";
      });
  },
});

export const { mealEdit, resetAdminState } = adminSlice.actions;
export default adminSlice.reducer;

//
// ✅ Async Thunks
//

export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.fetchAllUsers(token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "admin/getAllOrders",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.fetchAllOrders(token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllRatings = createAsyncThunk(
  "admin/getAllRatings",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.fetchAllRatings(token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllMeals = createAsyncThunk(
  "admin/getAllMeals",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.fetchAllMeals(token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addMeal = createAsyncThunk(
  "admin/addMeal",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.createMeal(formData, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeMeal = createAsyncThunk(
  "admin/removeMeal",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.deleteMeal(id, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateTheMeal = createAsyncThunk(
  "admin/updateMeal",
  async ({ id, updatedMeal }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.updateMeal(id, updatedMeal, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const updateTheOrder = createAsyncThunk(
  "admin/update/order",
  async (orderUpdate , thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.updateOrder(orderUpdate, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
