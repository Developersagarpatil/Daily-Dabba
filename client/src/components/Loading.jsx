import React from 'react';
import { Truck, Pizza, Coffee, Clock } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="relative">
        {/* Main delivery truck animation */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="animate-bounce">
            <Truck className="w-12 h-12 text-orange-500" />
          </div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>

        {/* Food items floating animation */}
        <div className="flex justify-center space-x-6 mb-8">
          <div className="animate-bounce" style={{ animationDelay: '0.1s' }}>
            <Pizza className="w-8 h-8 text-red-500" />
          </div>
          <div className="animate-bounce" style={{ animationDelay: '0.3s' }}>
            <Coffee className="w-8 h-8 text-amber-600" />
          </div>
          <div className="animate-bounce" style={{ animationDelay: '0.5s' }}>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        {/* Loading text with typing effect */}
        <div className="text-center">
          
          <div className="flex justify-center items-center space-x-1">
            <span className="text-lg text-gray-600">Loading</span>
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-gray-600 rounded-full animate-ping"></div>
              <div className="w-1 h-1 bg-gray-600 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-1 bg-gray-600 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-64 bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full animate-pulse w-3/4"></div>
        </div>

        {/* Circular loading indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          <div className="w-3 h-3 bg-orange-400 rounded-full animate-spin"></div>
          <div className="w-3 h-3 bg-red-400 rounded-full animate-spin" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-spin" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;