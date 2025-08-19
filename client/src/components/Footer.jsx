import { ShoppingBag, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react"
import { useLocation } from "react-router-dom"
const Footer = () => {

  const location = useLocation()

  if(location.pathname.includes('admin')){
    return(
      <></>
    )
  }



  return (
    <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ShoppingBag className="h-8 w-8 text-orange-500" />
                <span className="text-2xl font-bold">Indori LunchBox</span>
              </div>
              <p className="text-gray-400">Bringing authentic Indori flavors to your table since 2020</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-500">Home</a></li>
                <li><a href="#" className="hover:text-orange-500">Menu</a></li>
                <li><a href="#" className="hover:text-orange-500">About Us</a></li>
                <li><a href="#" className="hover:text-orange-500">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>MG Road, Indore, MP 452001</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>hello@indorilunchbox.com</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <Facebook className="h-6 w-6 text-gray-400 hover:text-orange-500 cursor-pointer" />
                <Instagram className="h-6 w-6 text-gray-400 hover:text-orange-500 cursor-pointer" />
                <Twitter className="h-6 w-6 text-gray-400 hover:text-orange-500 cursor-pointer" />
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Indori LunchBox. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}

export default Footer
