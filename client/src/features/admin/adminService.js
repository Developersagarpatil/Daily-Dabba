import axios from 'axios';

// ✅ Fetch All Users
const fetchAllUsers = async (token) => {
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get("/api/admin/view-users", options);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Fetch All Orders
const fetchAllOrders = async (token) => {
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get("/api/admin/view-orders", options);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Fetch All Ratings
const fetchAllRatings = async (token) => {
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get("/api/admin/view-ratings", options);
    return response.data;
  } catch (error) {
    console.error("Error fetching ratings:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Fetch All Meals
const fetchAllMeals = async (token) => { // 🔥 FIXED: Correct function name
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get("/api/meal", options);
    return response.data;
  } catch (error) {
    console.error("Error fetching meals:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Delete a Meal
const deleteMeal = async (id, token) => {
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(`/api/admin/remove-meal/${id}`, options);
    return response.data;
  } catch (error) {
    console.error("Error deleting meal:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Add a New Meal
const createMeal = async (formData, token) => {
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post('/api/admin/add-meal', formData, options);
    return response.data;
  } catch (error) {
    console.error("Error creating meal:", error.response?.data || error.message);
    throw error;
  }
};

const updateMeal = async (id, updatedMeal, token) => {
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(`/api/admin/update-meal/${id}`, updatedMeal, options);
    return response.data;
  } catch (error) {
    console.error("Error updating meal:", error.response?.data || error.message);
    throw error;
  }
};

const updateOrder = async (orderUpdate, token) => {
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(`/api/admin/update-order/` + orderUpdate._id, {status : orderUpdate.status}, options);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error updating meal:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Export all service functions
const adminService = {
  fetchAllUsers,
  fetchAllOrders,
  fetchAllRatings,
  fetchAllMeals, // 🔥 FIXED: Correct export
  deleteMeal,
  createMeal,
  updateMeal,
  updateOrder
};

export default adminService;
