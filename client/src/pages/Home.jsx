import { Clock, Search } from "lucide-react";
import FeaturedCard from "../components/FeaturedCard";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { getMeals } from "../features/meals/MealSlice";

const Home = () => {
  const { meals, mealLoading } = useSelector((state) => state.meal);
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState(""); // ✅ Added state for search

  useEffect(() => {
    dispatch(getMeals());
  }, [dispatch]);

  if (mealLoading) {
  return <Loading />;
}

const filteredMeals = Array.isArray(meals)
  ? meals.filter((meal) =>
      meal.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : [];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-50 via-orange-50 to-rose-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Authentic <span className="text-orange-500">Indori</span> Flavors
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience the taste of Indore with our freshly prepared lunch boxes delivered right to your doorstep
          </p>

          {/* ✅ Replaced Order Now with Search Bar */}
          <div className="relative mx-auto" style={{ width: "60%" }}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search meals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // ✅ Update search query
              className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Featured Meals Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Featured Meals</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMeals.map((meal) => (
              <FeaturedCard key={meal._id} meal={meal} />
            ))}

            {filteredMeals.length === 0 && (
              <p className="col-span-full text-center text-gray-500">No meals found for "{searchQuery}"</p>
            )}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Choose Your Meal</h3>
              <p className="text-gray-600">Browse our delicious menu and select your favorite Indori dishes</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Place Your Order</h3>
              <p className="text-gray-600">Quick checkout process with multiple payment options</p>
            </div>

            <div className="text-center">
              <div className="bg-rose-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Fast Delivery</h3>
              <p className="text-gray-600">Fresh meals delivered hot to your doorstep within 30 minutes</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
