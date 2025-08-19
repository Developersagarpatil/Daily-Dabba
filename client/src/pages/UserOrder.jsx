import { ShoppingBag, Search, Filter, Package, Clock, CheckCircle, Truck, Star, RotateCcw } from 'lucide-react';

const UserOrder = () => {
  return (
     <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
            <p className="text-gray-600 mt-2">Track and manage your food orders</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-orange-500">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Order Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-800">24</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <Package className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-800">2</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Delivered</p>
                <p className="text-2xl font-bold text-gray-800">22</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-800">₹4,320</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <Package className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="flex items-center space-x-8 px-6 py-4">
            <button className="text-orange-500 font-semibold border-b-2 border-orange-500 pb-2">
              All Orders
            </button>
            <button className="text-gray-600 hover:text-orange-500 pb-2">
              In Progress
            </button>
            <button className="text-gray-600 hover:text-orange-500 pb-2">
              Delivered
            </button>
            <button className="text-gray-600 hover:text-orange-500 pb-2">
              Cancelled
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {/* Current Order */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="bg-yellow-50 px-6 py-3 border-b border-yellow-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-yellow-600" />
                  <span className="font-semibold text-yellow-800">Order in Progress</span>
                </div>
                <span className="text-sm text-yellow-700">Estimated: 15 mins</span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">#ORD-024</h3>
                  <p className="text-sm text-gray-600">Placed on March 16, 2024 at 1:30 PM</p>
                </div>
                <span className="px-3 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  Preparing
                </span>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <img 
                  src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=100" 
                  alt="Dal Bati Churma" 
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">Dal Bati Churma</h4>
                  <p className="text-sm text-gray-600">Quantity: 1</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">₹180</p>
                </div>
              </div>
              
              {/* Order Progress */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-800">Order Confirmed</span>
                  </div>
                  <span className="text-xs text-gray-500">1:30 PM</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-800">Preparing</span>
                  </div>
                  <span className="text-xs text-gray-500">1:35 PM</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-gray-500">Out for Delivery</span>
                  </div>
                  <span className="text-xs text-gray-500">-</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-gray-500">Delivered</span>
                  </div>
                  <span className="text-xs text-gray-500">-</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <button className="text-red-500 hover:text-red-600 text-sm font-medium">
                  Cancel Order
                </button>
                <button className="text-orange-500 hover:text-orange-600 text-sm font-medium">
                  Track Order
                </button>
              </div>
            </div>
          </div>

          {/* Past Orders */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">#ORD-023</h3>
                <p className="text-sm text-gray-600">Delivered on March 15, 2024 at 2:15 PM</p>
              </div>
              <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                Delivered
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img 
                  src="https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=100" 
                  alt="Poha Jalebi" 
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">Poha Jalebi Combo</h4>
                  <p className="text-sm text-gray-600">Quantity: 2</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">₹240</p>
                  <div className="flex items-center mt-1">
                    <Clock className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600">20 mins</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 text-sm font-medium">
                  <RotateCcw className="h-4 w-4" />
                  <span>Reorder</span>
                </button>
                <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                  View Details
                </button>
              </div>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
                <span className="text-sm text-gray-600 ml-2">Rated</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">#ORD-022</h3>
                <p className="text-sm text-gray-600">Delivered on March 12, 2024 at 1:45 PM</p>
              </div>
              <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                Delivered
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img 
                  src="https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=100" 
                  alt="Indori Thali" 
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">Indori Special Thali</h4>
                  <p className="text-sm text-gray-600">Quantity: 1</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">₹250</p>
                  <div className="flex items-center mt-1">
                    <Clock className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600">30 mins</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 text-sm font-medium">
                  <RotateCcw className="h-4 w-4" />
                  <span>Reorder</span>
                </button>
                <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                  View Details
                </button>
              </div>
              <div className="flex items-center">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
                <Star className="h-4 w-4 text-gray-300" />
                <span className="text-sm text-gray-600 ml-2">Rated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition duration-300">
            Load More Orders
          </button>
        </div>
      </div>
  )
}

export default UserOrder
