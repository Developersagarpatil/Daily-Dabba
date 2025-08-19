import axios from "axios";

// Fetch a single meal by ID
const fetchMeal = async (mid) => {
  const response = await axios.get('/api/meal/' + mid);
  return response.data;
};

// Fetch all meals
const fetchMeals = async () => {
  const response = await axios.get('/api/meal/');
  return response.data;
};

const mealService = { fetchMeal, fetchMeals };

export default mealService;
