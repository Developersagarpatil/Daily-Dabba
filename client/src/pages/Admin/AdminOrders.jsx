import { all } from "axios";
import { Search, Bell, Menu, Pencil, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrders,
  getAllRatings,
  updateTheOrder,
} from "../../features/admin/adminSlice";

const AdminOrders = () => {
  const dispatch = useDispatch();

  const {
    users,
    allOrders,
    allRatings,
    adminLoading,
    adminSuccess,
    adminError,
    adminErrorMessage,
  } = useSelector((state) => state.admin);

  // ✅ Search state
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Filtered orders
  const filteredOrders = allOrders.filter((order) => {
    const search = searchQuery.toLowerCase();
    return (
      order.user.name.toLowerCase().includes(search) ||
      order.user.email.toLowerCase().includes(search) ||
      order.user.phone.toString().includes(search)
    );
  });

  // ✅ Update Order Status
  const updateOrderStatus = (orderId, newStatus) => {
    dispatch(updateTheOrder({ _id: orderId, status: newStatus }));
  };

  useEffect(() => {
    if (allOrders.length === 0) {
      dispatch(getAllOrders());
    }
  }, [dispatch, allOrders.length]);

  return (
    <div className="flex min-h-screen bg-gray-100 ml-64">
      {/* Main Content */}
      <div className="flex-1 min-h-screen p-6">
        {/* Top Header */}
        <header className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm sticky top-0 z-10 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Menu className="h-5 w-5 text-gray-600 md:hidden" />
            <h1 className="text-xl font-semibold text-gray-800">
              Order Management
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <Bell className="h-5 w-5 text-gray-600" />
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6">
          <div className="p-4 bg-white rounded-lg shadow flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 text-sm">Total Orders</h3>
              <p className="text-2xl font-bold">{allOrders.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center">
              🛒
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 text-sm">Pending Orders</h3>
              <p className="text-2xl font-bold">
                {allOrders.filter((item) => item.status === "pending").length}
              </p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 text-yellow-500 rounded-full flex items-center justify-center">
              ⏳
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 text-sm">Completed Orders</h3>
              <p className="text-2xl font-bold">
                {allOrders.filter((item) => item.status === "delivered").length}
              </p>
            </div>
            <div className="w-10 h-10 bg-green-100 text-green-500 rounded-full flex items-center justify-center">
              ✅
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 text-sm">Order Cancelled</h3>
              <p className="text-2xl font-bold">
                {allOrders.filter((item) => item.status === "cancelled").length}
              </p>
            </div>
            <div className="w-10 h-10 bg-red-100 text-red-500 rounded-full flex items-center justify-center">
              ✖
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-gray-600 text-sm">Order ID</th>
                <th className="p-3 text-gray-600 text-sm">Customer</th>
                <th className="p-3 text-gray-600 text-sm">Items</th>
                <th className="p-3 text-gray-600 text-sm">Amount</th>
                <th className="p-3 text-gray-600 text-sm">Status</th>
                <th className="p-3 text-gray-600 text-sm">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-3 text-sm text-gray-700">{order._id}</td>
                  <td className="p-3 text-sm">
                    <div className="font-semibold text-gray-800">
                      {order.user.name}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {order.user.email}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {order.user.phone}
                    </div>
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    {order.meal.name}
                  </td>
                  <td className="p-3 text-sm font-semibold text-orange-600">
                    ₹{order.meal.price.toLocaleString()}
                  </td>
                  <td className="p-3 text-sm">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order._id, e.target.value.toLowerCase())
                      }
                      className={`px-2 py-1 rounded border ${
                        order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-3 text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Empty state */}
          {filteredOrders.length === 0 && (
            <p className="text-center p-6 text-gray-500">
              No orders match your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
