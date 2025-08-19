import {
  Utensils,
  FileText,
  Image,
  IndianRupee,
  X,
  Eye,
  Leaf,
  Upload,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMeal,
  updateTheMeal,
  resetAdminState,
} from "../../features/admin/adminSlice"; // ✅ import resetAdminState
import { toast } from "react-toastify";
import Loading from "../Loading";

const MealModal = ({ showModal, closeModal }) => {
  const { adminSuccess, adminLoading, adminError, adminErrorMessage, editMeal } =
    useSelector((state) => state.admin);

  const dispatch = useDispatch();

  // Form fields
  const [mealName, setMealName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [isVeg, setIsVeg] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // ✅ Reset flags when modal opens
  useEffect(() => {
    if (showModal) {
      dispatch(resetAdminState());
    }
  }, [showModal, dispatch]);

  // Prefill form fields when editing
  useEffect(() => {
    if (editMeal.isEdit) {
      const { meal } = editMeal;
      setMealName(meal.name || "");
      setDescription(meal.description || "");
      setImageUrl(meal.image || "");
      setPrice(meal.price || 0);
      setIsVeg(meal.isVeg || true);
      setIsActive(meal.isActive || false);
    } else {
      setMealName("");
      setDescription("");
      setImageUrl("");
      setPrice(0);
      setIsVeg(true);
      setIsActive(true);
    }
  }, [editMeal]);

  // Handle success/error
  useEffect(() => {
    if (adminSuccess && showModal) {
      toast.success(editMeal.isEdit ? "Meal Updated Successfully! 😎" : "Meal Created!! 😍");
      handleCloseModal();
      dispatch(resetAdminState()); // ✅ Reset after success
    }

    if (adminError && showModal) {
      toast.error(adminErrorMessage);
      dispatch(resetAdminState()); // ✅ Reset after error
    }
  }, [adminSuccess, adminError, adminErrorMessage, showModal, editMeal.isEdit, dispatch]);

  // Show loading
  if (adminLoading) {
    return <Loading />;
  }

  if (!showModal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const mealData = {
      name: mealName,
      description,
      image: imageUrl,
      price,
      isVeg,
      isActive,
    };

    if (editMeal.isEdit) {
      // 🔥 Call update action if editing
      dispatch(updateTheMeal({ id: editMeal.meal._id, updatedMeal: mealData }));
    } else {
      // ✅ Otherwise, call addMeal action
      dispatch(addMeal(mealData));
    }
  };

  const handleCloseModal = () => {
    dispatch(resetAdminState()); // ✅ Reset on close
    dispatch({
      type: "admin/setEditMeal",
      payload: { isEdit: false, meal: {} },
    });
    closeModal();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Utensils className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {editMeal.isEdit ? "Edit Meal" : "Add New Meal"}
              </h2>
              <p className="text-sm text-gray-500">
                {editMeal.isEdit
                  ? "Update the details of your meal"
                  : "Create a new meal for your menu"}
              </p>
            </div>
          </div>
          <button
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={handleCloseModal}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Meal Name */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Utensils className="w-4 h-4" />
              <span>Meal Name</span>
            </label>
            <input
              type="text"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter meal name (e.g., Dal Roti)"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <FileText className="w-4 h-4" />
              <span>Description</span>
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              placeholder="Describe the meal, ingredients, etc."
              required
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Image className="w-4 h-4" />
              <span>Image URL</span>
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="https://example.com/meal.jpg"
              required
            />
          </div>

          {/* Price and Toggles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <IndianRupee className="w-4 h-4" />
                <span>Price</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="0.00"
                  min="1"
                  step="0.01"
                  required
                />
              </div>
            </div>

            {/* Vegetarian Toggle */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Leaf className="w-4 h-4" />
                <span>{isVeg ? "Vegetarian" : "Non-Vegetarian"}</span>
              </label>
              <label className="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isVeg}
                  onChange={() => setIsVeg(!isVeg)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500 rounded-full peer peer-checked:bg-green-400"></div>
              </label>

              {/* Active toggle */}
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mt-4">
                <Eye className="w-4 h-4" />
                <span>{isActive ? "Active" : "In-Active"}</span>
              </label>
              <label className="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={() => setIsActive(!isActive)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500 rounded-full peer peer-checked:bg-green-400"></div>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>{editMeal.isEdit ? "Update Meal" : "Add Meal"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MealModal;
