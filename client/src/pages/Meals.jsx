import { useEffect, useState } from "react";
import FeaturedCard from "../components/FeaturedCard";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getMeals } from "../features/meals/mealSlice";
import { Search } from "lucide-react";

const Meals = () => {
  const { meals, mealLoading } = useSelector((state) => state.meal);

  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMeals());
  }, [dispatch]);

  // Filter meals based on search query
  const filteredMeals = meals.filter((meal) =>
    meal.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (mealLoading) {
    return <Loading />;
  }

  return (
    <section className="pt-24 pb-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Search Bar */}
        <div
          className="relative mx-auto mb-10"
          style={{ width: "60%" }}
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search meals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>

        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          All Meals
        </h2>

        {/* Meals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMeals.map((meal) => (
            <FeaturedCard key={meal._id} meal={meal} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Meals;
