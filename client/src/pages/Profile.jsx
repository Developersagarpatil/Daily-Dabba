import { ShoppingBag, User, MapPin, Phone, Mail, Edit, Package, Star, Clock, CreditCard } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'react-toastify'
import { useEffect } from 'react';
import Loading from "../components/Loading";
import { cancelOrder, getOrders } from '../features/orders/orderSlice';
import { Link, useNavigate } from 'react-router-dom';
const Profile = () => {

  const { user } = useSelector(state => state.auth)
  const {orders, orderLoading, orderSuccess, orderError, orderErrorMessage} = useSelector(state => state.order)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Get total orders price
  const totalSpent = orders.reduce((p,c) => p + c.meal?.price, 0)
  
  const handleCancelOrder = (id) => {
    dispatch(cancelOrder(id))
    navigate("/")
    toast.success('Order Cancelled')
  }

  useEffect(()=>{
    if(!user){
      navigate("/login")
    }
    dispatch(getOrders())
    if(orderError && orderErrorMessage){
      toast.error(orderErrorMessage)
    }
  },[user, orderError, orderErrorMessage])

  if(orderLoading){
    return <Loading/>
  }


  return (
     <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm border-gray-400 p-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">{user.name[0]}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-gray-600">Customer since {new Date(user.createdAt).toLocaleDateString('en-IN')}</p>
                <button className="mt-4 flex items-center space-x-2 text-orange-500 hover:text-orange-600 mx-auto">
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border-gray-400 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Package className="h-5 w-5 text-orange-500" />
                    <span className="text-gray-600">Total Orders</span>
                  </div>
                  <span className="font-semibold text-gray-800">{orders?.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600">Total Spent</span>
                  </div>
                  <span className="font-semibold text-gray-800">₹{totalSpent}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="text-gray-600">Last Meal</span>
                  </div>
                  <span className="font-semibold text-gray-800">{orders[0]?.meal.name}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-sm border-gray-400 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
                <button className="text-orange-500 hover:text-orange-600">
                  <Edit className="h-5 w-5" />
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <User className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-800">{user.name}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-800">{user.email}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-800">+91 {user.phone}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-800">MG Road, Indore, MP</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm border-gray-400">
              <div className="px-6 py-4 border-gray-400-b">
                <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {
                  orders.map(order =>{
                    return (
                      <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-800">{order._id}</h3>
                      <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                    </div>
                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <img 
                      src={order.meal?.image} 
                      alt={order.meal?.image} 
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{order.meal?.name}</h4>
                      <p className="text-sm text-gray-600">Quantity: 1</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">₹{order.meal?.price}</p>
                      <div className="flex items-center mt-1">
                        <Clock className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-600">25 mins</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Link to={`/auth/meal/${order.meal?._id}`}  className="text-orange-500 hover:text-orange-600 text-sm font-medium">
                      Reorder
                    </Link>
                    {
                      order.status === "cancelled" ? (<Link to={`/auth/meal/${order.meal?._id}`}  className="text-orange-500 hover:text-orange-600 text-sm font-medium">
                      
                    </Link>) : (<button onClick={()=> handleCancelOrder(order._id)} className="cursor-pointer text-red-500 hover:text-orange-600 text-sm font-medium">
                      {order.status === "delivered" ? "" : "Cancel This Order"}
                    </button>)
                    }
                    <Link to={`/auth/meal/${order.meal?._id}`} className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                      Rate & Review
                    </Link>
                  </div>
                </div>
                    )
                  })
                }
              </div>
              
              <div className="px-6 py-4 border-gray-400-t">
                <button className="text-orange-500 hover:text-orange-600 font-medium">
                  View All Orders →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Profile
