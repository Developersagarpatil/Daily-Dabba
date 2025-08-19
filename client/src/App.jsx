import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ViewMeal from './pages/ViewMeal'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import UserOrder from './pages/UserOrder'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminUser from './pages/Admin/AdminUser'
import AdminMeals from './pages/Admin/AdminMeals'
import AdminRatings from './pages/Admin/AdminRatings'
import Meals from './pages/Meals'
import AdminOrders from './pages/Admin/AdminOrders'
import PrivateComponent from './components/PrivateComponent'
import Contact from './pages/Contact'
import About from './pages/About'

const App = () => {
  return (
    <Router>
      <div className='min-h-screen bg-white'>
     <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/auth' element={<PrivateComponent/>}>
       <Route path='meal/:id' element={<ViewMeal/>}/>
       <Route path='cart' element={<Cart/>}/>
       <Route path='my-profile' element={<Profile/>}/>
       <Route path='my-Orders' element={<UserOrder/>}/>
       <Route path='admin' element={<AdminDashboard/>}/>
       <Route path='admin/users' element={<AdminUser/>}/>
       <Route path='admin/meals' element={<AdminMeals/>}/>
       <Route path='admin/orders' element={<AdminOrders/>}/>
       <Route path='admin/ratings' element={<AdminRatings/>}/>
      </Route>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/meals' element={<Meals/>}/>
      <Route path='/Contact' element={<Contact/>}/>
      <Route path='/About' element={<About/>}/>
     </Routes>
     <Footer/>
     <ToastContainer/>
    </div>
    </Router>
  )
}

export default App
