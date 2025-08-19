import React, { useEffect } from 'react'
import { 
  ShoppingBag, 
  Users, 
  UtensilsCrossed, 
  ShoppingCart, 
  Star, 
  BarChart3, 
  Settings,
  Bell,
  Search,
  Menu,
  MessageSquare,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRatings } from '../../features/admin/adminSlice';
const AdminRatings = () => {


  
  const Dispatch = useDispatch()

  const {users, allOrders,allRatings,  adminLoading, adminSuccess, adminError, adminErrorMessage} = useSelector(state => state.admin)

// average Rating

const avgRating = allRatings.reduce((p,c) => p+c.rating / allRatings.length, 0)

  // Postive Ratings
  const positiveRatings = allRatings.filter(rating => rating.rating > 3)

  // Negative Ratings
  const negativeRatings = allRatings.filter(rating => rating.rating < 3)

  useEffect(()=>{
    if(allRatings.length === 0){
      Dispatch(getAllRatings())
    }
  },[])



  return (
     <div className="ml-64 flex-1">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-gray-400-b h-16 flex items-center justify-between px-6">
          <div className="flex items-center">
            <Menu className="h-6 w-6 text-gray-600 md:hidden" />
            <h1 className="text-2xl font-semibold text-gray-800 ml-4">Ratings & Reviews</h1>
          </div>
        </header>

        {/* Ratings Content */}
        <main className="p-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border-gray-400">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Rating</p>
                  <p className="text-3xl font-bold text-gray-800">{avgRating.toFixed(2)}</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
                <span className="text-sm text-gray-500 ml-2">({allRatings.length} reviews)</span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border-gray-400">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                  <p className="text-3xl font-bold text-gray-800">{allRatings.length}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <MessageSquare className="h-8 w-8 text-blue-500" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border-gray-400">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Positive</p>
                  <p className="text-3xl font-bold text-gray-800">{positiveRatings.length}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <ThumbsUp className="h-8 w-8 text-green-500" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border-gray-400">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Negative</p>
                  <p className="text-3xl font-bold text-gray-800">{negativeRatings.length}</p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <ThumbsDown className="h-8 w-8 text-red-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="bg-white rounded-xl shadow-sm border-gray-400 mb-8">
            <div className="px-6 py-4 border-gray-400-b">
              <h2 className="text-lg font-semibold text-gray-800">Rating Distribution</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {allRatings.map((rating) => (
                  <div key={rating._id} className="flex items-center">
                    <span className="text-sm font-medium text-gray-700 w-8">{rating.rating}</span>
                    <Star className="h-4 w-4 text-yellow-400 fill-current mx-2" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mx-4">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full" 
                        style={{ 
                          width: rating.rating === 5 ? '68%' : 
                                rating.rating === 4 ? '22%' : 
                                rating.rating === 3 ? '6%' : 
                                rating.rating === 2 ? '3%' : '1%' 
                        }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12">
                      {rating.rating === 5 ? '847' : 
                       rating.rating === 4 ? '274' : 
                       rating.rating === 3 ? '75' : 
                       rating.rating === 2 ? '37' : '14'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="bg-white rounded-xl shadow-sm border-gray-400">
            <div className="px-6 py-4 border-gray-400-b flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Recent Reviews</h2>
              <div className="flex items-center space-x-2">
                <select className="border-gray-400 border-gray-400-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option>All Ratings</option>
                  <option>5 Stars</option>
                  <option>4 Stars</option>
                  <option>3 Stars</option>
                  <option>2 Stars</option>
                  <option>1 Star</option>
                </select>
                <select className="border-gray-400 border-gray-400-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option>All Meals</option>
                  <option>Dal Bati Churma</option>
                  <option>Poha Jalebi</option>
                  <option>Indori Thali</option>
                </select>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              
              {
                allRatings.map(rating =>{
                  return(
                    <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">{rating.user.name[0]}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{rating.user.name}</h3>
                        <p className="text-sm text-gray-500">{rating.meal?.name}</p>
                      </div>
                      <div className="flex items-center">
                        {Array.from({ length: rating.rating}, (_, i) => i + 1).map((star) => (
                          <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                        <span className="text-sm text-gray-500 ml-2">{new Date(rating.createdAt).toLocaleDateString('en-IN')}</span>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      {rating.text}
                    </p>
                  </div>
                </div>
              </div>
                  )
                })
              }
              
            </div>
            
            {/* Pagination */}
            <div className="px-6 py-4 border-gray-400-t flex items-center justify-between">
              <p className="text-sm text-gray-700">Showing 1 to 3 of 1,247 reviews</p>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-2 border-gray-400 border-gray-400-gray-300 rounded-lg text-sm hover:bg-gray-50">Previous</button>
                <button className="px-3 py-2 bg-orange-500 text-white rounded-lg text-sm">1</button>
                <button className="px-3 py-2 border-gray-400 border-gray-400-gray-300 rounded-lg text-sm hover:bg-gray-50">2</button>
                <button className="px-3 py-2 border-gray-400 border-gray-400-gray-300 rounded-lg text-sm hover:bg-gray-50">3</button>
                <button className="px-3 py-2 border-gray-400 border-gray-400-gray-300 rounded-lg text-sm hover:bg-gray-50">Next</button>
              </div>
            </div>
          </div>
        </main>
      </div>
  )
}

export default AdminRatings
