import { ShoppingBag, User, Mail, Lock, CheckCircle, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import { toast } from 'react-toastify';
import { registerUser } from '../features/auth/authSlice';
import Loading from '../components/Loading';

const Register = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user, isLoading, isSuccess, isError, message} = useSelector(state=> state.auth)

  const [formData, setFormData] = useState({name :"", email: "", phone : "", password : "", password2: ""})

  const {name, email, phone, password, password2} = formData

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(password !== password2){
      toast.error("Password Not Match")
    }else{
      dispatch(registerUser(formData))
    }
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

        {/* Register Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Create Account</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="fullName"
                  name='name'
                  value={name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition duration-200"
                  placeholder="Enter your full name"
                />
              </div>
            </div>
            
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
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="phone"
                  id="phone"
                  name='phone'
                  value={phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition duration-200"
                  placeholder="Enter your phone"
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
                  placeholder="Create a password"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <CheckCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  id="password2"
                  name='password2'
                  value={password2}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition duration-200"
                  placeholder="Confirm your password"
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-orange-500 hover:text-orange-600">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-orange-500 hover:text-orange-600">Privacy Policy</a>
              </label>
            </div>
            
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transform hover:scale-105 transition duration-300 shadow-lg"
            >
              Create Account
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a href="#" className="text-orange-500 hover:text-orange-600 font-semibold">
                Sign in here
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

export default Register
