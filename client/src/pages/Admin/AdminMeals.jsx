import {
  UtensilsCrossed,
  Star,
  Bell,
  Search,
  Menu,
  Plus,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMeals, removeMeal } from '../../features/admin/adminSlice';
import Loading from '../../components/Loading';
import MealModal from '../../components/admin/MealModal';
import AdminMealCard from '../../components/admin/AdminMealCard';

const AdminMeals = () => {
  const {
    allMeals,
    adminLoading,
    allRatings,
  } = useSelector((state) => state.admin);

  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // ✅ Added search state

  const dispatch = useDispatch();

  const avgRating = allRatings
    .reduce((p, c) => p + c.rating / allRatings.length, 0)
    .toFixed(2);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  // Remove this Meal
  const removeThisMeal = (id) => {
    dispatch(removeMeal(id));
  };

  useEffect(() => {
    dispatch(getAllMeals());
  }, [dispatch]);

  if (adminLoading) {
    return <Loading />;
  }

  // ✅ Filter meals based on searchQuery
  const filteredMeals = allMeals.filter((meal) =>
    meal.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="ml-64 flex-1">
      {/* Top Bar */}
      <header className="bg-white shadow-sm border-gray-400 h-16 flex items-center justify-between px-6">
        <div className="flex items-center">
          <Menu className="h-6 w-6 text-gray-600 md:hidden" />
          <h1 className="text-2xl font-semibold text-gray-800 ml-4">
            Meal Management
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search meals by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // ✅ Update search query
              className="pl-10 pr-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>
          <button
            onClick={openModal}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Meal</span>
          </button>
          <Bell className="h-6 w-6 text-gray-600" />
        </div>
      </header>

      <MealModal showModal={showModal} closeModal={closeModal} />

      {/* Meals Content */}
      <main className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border-gray-400">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Meals
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {allMeals.length}
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <UtensilsCrossed className="h-8 w-8 text-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-gray-400">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Meals
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {allMeals.length}
                </p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <UtensilsCrossed className="h-8 w-8 text-green-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-gray-400">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Best Seller
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {allMeals.length > 0
                    ? allMeals.reduce((prev, current) =>
                        prev.sold > current.sold ? prev : current
                      ).name
                    : "No Meals"}
                </p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-gray-400">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Avg Rating
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {avgRating}
                </p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <Star className="h-8 w-8 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Meals Grid */}
        <div className="bg-white rounded-xl shadow-sm border-gray-400">
          <div className="px-6 py-4 border-gray-400 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              All Meals
            </h2>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMeals.map((meal) => (
                <AdminMealCard
                  key={meal._id}
                  meal={meal}
                  openModal={openModal}
                />
              ))}
            </div>

            {/* If no meals match */}
            {filteredMeals.length === 0 && (
              <p className="text-center text-gray-500 mt-6">
                No meals found for "{searchQuery}"
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminMeals;
