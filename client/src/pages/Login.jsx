import { ShoppingBag, Mail, Lock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../features/auth/authSlice';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';
const Login = () => {

   const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user, isLoading, isSuccess, isError, message} = useSelector(state=> state.auth)

  const [formData, setFormData] = useState({ email: "", password : ""})

  const { email, password} = formData

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
      dispatch(loginUser(formData))
    
  }

  useEffect(()=>{
    if(user){
      navigate("/")
    }
    if(isError && message){
      toast.error(message)
    }
  },[user,isError, message])


  if(isLoading){
    return(
      <Loading/>
    )
  }


  return (
     <div className=" bg-gradient-to-br from-orange-50 via-yellow-50 to-rose-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Login</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name='email'
                  value={email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  name='password'
                  value={password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition duration-200"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-orange-500 hover:text-orange-600">
                Forgot password?
              </a>
            </div>
            
            <button
              type="submit"
              className="w-full cursor-pointer bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transform hover:scale-105 transition duration-300 shadow-lg"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="text-orange-500 hover:text-orange-600 font-semibold">
                Sign up here
              </a>
            </p>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <a href="#" className="text-gray-600 hover:text-orange-500">
            ← Back to homepage
          </a>
        </div>
      </div>
    </div>
  )
}

export default Login
