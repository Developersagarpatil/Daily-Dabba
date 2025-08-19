import { Star, Clock } from "lucide-react"
import {Link} from 'react-router-dom'

const FeaturedCard = ({meal}) => {
  return (
    <Link to={`/auth/meal/${meal._id}`}>
     <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
              <img src={meal.image} alt={meal.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{meal.name}</h3>
                <p className="text-gray-600 mb-4 truncate">{meal.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-500">₹{meal.price}</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-gray-600 ml-1">4.8</span>
                  </div>
                </div>
              </div>
            </div>

    </Link>
  )
}

export default FeaturedCard
