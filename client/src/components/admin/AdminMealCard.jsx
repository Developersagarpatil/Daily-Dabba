import React from 'react'
import {
  UtensilsCrossed,
  Star,
  Bell,
  Search,
  Menu,
  Plus,
  Edit,
  Trash2,
  Eye,
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { mealEdit, removeMeal } from '../../features/admin/adminSlice'; // ✅ import removeMeal thunk
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AdminMealCard = ({ meal, openModal }) => {
  const dispatch = useDispatch();

  // 📝 Show edit modal
  const showEdit = () => {
    dispatch(mealEdit(meal));
    openModal();
  };

  // 🗑️ Remove meal handler
  const removeThisMeal = (id) => {
    if (window.confirm(`Are you sure you want to delete "${meal.name}"?`)) {
      dispatch(removeMeal(id))
        .unwrap()
        .then(() => {
          toast.success("Meal deleted successfully ✅");
        })
        .catch((err) => {
          toast.error(err || "Failed to delete meal ❌");
        });
    }
  };

  return (
    <div className="bg-white border-gray-300 rounded-xl overflow-hidden hover:shadow-lg transition duration-300">
      <img src={meal.image} alt={meal.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{meal.name}</h3>
          <span
            className={
              meal.isActive
                ? "px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800"
                : "px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800"
            }
          >
            {meal.isActive ? "Active" : "Inactive"}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-3 truncate">{meal.description}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-orange-500">₹{meal.price}</span>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-gray-600 ml-1 text-sm">4.8 (124)</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Orders: {meal.isVeg? "veg" : "non-Veg"}</span>
          <div className="flex items-center space-x-2">
            <Link to={`/auth/meal/${meal._id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
              <Eye className="h-4 w-4" />
            </Link>
            <button
              className="p-2 text-green-600 hover:bg-green-50 rounded"
              onClick={showEdit}
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={() => removeThisMeal(meal._id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMealCard;
