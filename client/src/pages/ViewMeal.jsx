import {
  ShoppingBag,
  Star,
  Clock,
  Users,
  ArrowLeft,
  Plus,
  Minus,
  ShoppingCart,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { addRatings, getRatings } from "../features/ratings/ratingSlice";
import { getMeal } from "../features/meals/mealSlice";
import { addToCart } from "../features/orders/orderSlice";

const ViewMeal = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { meal, mealSuccess, mealLoading } = useSelector((state) => state.meal);
  const { ratings = [], ratingLoading } = useSelector((state) => state.rating);
  const { user } = useSelector((state) => state.auth); // ✅ Get user from Redux

  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");

  // Add to Cart
  const handAddToCart = (meal) => {
    dispatch(addToCart(meal));
    navigate("/auth/cart");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addRatings({
        mid: id,
        rating: Number(rating), // ensure it's a number
        text: review,
      })
    );
    setReview(""); // reset form
    setRating(1); // reset rating
  };

  const averageRating =
    ratings.length > 0
      ? ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length
      : 0;

  useEffect(() => {
    dispatch(getMeal(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (mealSuccess) {
      dispatch(getRatings(id));
    }
  }, [mealSuccess, dispatch, id]);

  if (mealLoading || ratingLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        to={"/meals"}
        className="flex items-center text-gray-600 hover:text-orange-500 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Meals
      </Link>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Meal Image */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <img
              src={meal?.image}
              alt={meal?.name}
              className="w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Meal Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {meal?.name}
            </h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.round(averageRating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-gray-600 ml-2">
                  {averageRating.toFixed(1)} / 5
                </span>
                <span className="text-gray-600 ml-2">{meal?.rating}</span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">{ratings?.length} reviews</span>
            </div>
            <p className="text-3xl font-bold text-orange-500 mb-6">
              ₹{meal?.price}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border-gray-400">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {meal?.description}
            </p>
          </div>

          {/* ✅ Order Button Only for Non-Admins */}
          {!user?.isAdmin && (
            <div className="bg-white rounded-xl p-6 shadow-sm border-gray-400">
              <Link
                onClick={() => handAddToCart(meal)}
                to="/auth/cart"
                className="w-full bg-orange-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-orange-600 transform hover:scale-105 transition duration-300 shadow-lg"
              >
                Order Now - ₹{meal?.price}
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <div className="bg-white rounded-xl shadow-sm border-gray-400">
          <div className="px-6 py-4 border-b border-gray-400">
            <h2 className="text-2xl font-bold text-gray-800">
              Customer Reviews
            </h2>
          </div>

          <div className="p-6 space-y-6">
            <h1 className="text-lg font-bold text-gray-800">Add Your Review</h1>

            {/* ✅ Review Form Only for Non-Admins */}
            {!user?.isAdmin && (
              <form
                onSubmit={handleSubmit}
                className="mb-16 border border-gray-300 p-4 rounded-md"
              >
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))} // ensure number
                  className="w-full border border-gray-200 p-2 rounded-md"
                >
                  {[1, 2, 3, 4, 5].map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Enter Your Review"
                  className="w-full border border-gray-200 my-2 p-4 rounded-md"
                ></textarea>
                <button
                  type="submit"
                  className="bg-orange-500 w-full py-2 rounded-md text-white font-semibold cursor-pointer hover:bg-orange-800"
                >
                  Submit
                </button>
              </form>
            )}

            {/* Reviews */}
            {ratings?.length > 0 ? (
              ratings.map((item) => (
                <div key={item._id} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {item?.user?.name?.[0]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">
                        {item?.user?.name}
                      </h3>
                      <div className="flex items-center">
                        {Array.from({ length: item.rating }, (_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{item?.text}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(item?.createdAt).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No reviews yet. Be the first to add one!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMeal;
