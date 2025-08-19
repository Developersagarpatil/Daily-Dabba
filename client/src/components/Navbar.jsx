import {
  ShoppingBag,
  Users,
  UtensilsCrossed,
  ShoppingCart,
  Star,
  BarChart3,
  Bell,
  Search,
  Menu,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOutUser } from "../features/auth/authSlice";
const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.order);

  const handleLogout = () => {
    dispatch(LogOutUser());
    navigate("/login");
  };

  // Admin Sidebar
  if (location.pathname.includes("admin")) {
    return (
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg flex flex-col justify-between">
        {/* Header */}
        <Link
          to={"/"}
          className="flex items-center justify-center h-16 border-gray-400"
        >
          <ShoppingBag className="h-8 w-8 text-orange-500" />
          <span className="ml-2 text-xl font-bold text-gray-800">
            Admin Panel
          </span>
        </Link>

        {/* Sidebar Links */}
        <nav className="flex-1 mt-8">
          <div className="px-4 space-y-2">
            <Link
              to="auth/admin"
              className={`flex items-center px-4 py-3 rounded-lg ${
                location.pathname === "/admin"
                  ? "text-gray-700 bg-orange-50"
                  : "text-gray-700 hover:bg-orange-50"
              }`}
            >
              <BarChart3 className="h-5 w-5 mr-3" />
              Dashboard
            </Link>
            <Link
              to="auth/admin/users"
              className={`flex items-center px-4 py-3 rounded-lg ${
                location.pathname === "/admin/users"
                  ? "text-gray-700 bg-orange-50"
                  : "text-gray-700 hover:bg-orange-50"
              }`}
            >
              <Users className="h-5 w-5 mr-3" />
              Users
            </Link>
            <Link
              to="auth/admin/meals"
              className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <UtensilsCrossed className="h-5 w-5 mr-3" />
              Meals
            </Link>
            <Link
              to="auth/admin/orders"
              className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <ShoppingCart className="h-5 w-5 mr-3" />
              Orders
            </Link>
            <Link
              to="auth/admin/ratings"
              className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <Star className="h-5 w-5 mr-3" />
              Ratings
            </Link>
          </div>
        </nav>

        {/* Logout Button at Bottom */}
        <div className="px-4 mb-6">
          <button
            onClick={handleLogout}
            className="w-full cursor-pointer text-white bg-red-500 hover:bg-red-800 rounded-full py-2 px-4 font-medium"
          >
            LogOut
          </button>
        </div>
      </div>
    );
  }

  // Normal Navbar
  return (
    <header className="bg-white shadow-sm border-gray-400">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to={"/"} className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-orange-500" />
            <span className="text-2xl font-bold text-gray-800">
              Indori LunchBox
            </span>
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to={"/"}
              className="text-gray-700 hover:text-orange-500 font-medium"
            >
              Home
            </Link>
            <Link
              to={"/meals"}
              className="text-gray-700 hover:text-orange-500 font-medium"
            >
              Meals
            </Link>
            <Link
              href={"/About"}
              className="text-gray-700 hover:text-orange-500 font-medium"
            >
              About
            </Link>
            <Link
              href="/Contact"
              className="text-gray-700 hover:text-orange-500 font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Right Side */}
          {user ? (
            <div className="flex items-center space-x-4">
              {/* Cart */}
              {!user.isAdmin && (
                <Link to="auth/cart" className="relative">
                  <ShoppingCart className="h-6 w-6 text-gray-700" />
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart ? "01" : "0"}
                  </span>
                </Link>
              )}
              {/* Profile */}
              <Link
                to={user.isAdmin ? "auth/admin" : "auth/my-profile"}
                className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center"
              >
                <span className="text-white font-semibold text-sm">
                  {user?.name[0]}
                </span>
              </Link>
              {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-white cursor-pointer bg-red-500 hover:bg-red-800 rounded-full py-2 px-4 font-medium"
              >
                LogOut
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to={"/login"}
                className="text-gray-700 cursor-pointer hover:text-orange-500 font-medium"
              >
                Login
              </Link>
              <Link
                to={"/register"}
                className="bg-orange-500 cursor-pointer text-white px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
