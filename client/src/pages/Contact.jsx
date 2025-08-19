import React from 'react'
 
const Contact = () => {

    console.log(Contact)
  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 lg:p-12 bg-white">
     
      {/* Form Section */}
      <div className="w-full lg:w-2/3 space-y-4">
        <select className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400">
          <option>How can we help you?*</option>
          <option>Feedback</option>
          <option>Complaint</option>
          <option>General Query</option>
        </select>
 
        <input
          type="text"
          placeholder="Full Name*"
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <input
          type="email"
          placeholder="Email Address*"
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <input
          type="text"
          placeholder="Mobile Number (optional)"
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <textarea
          rows={4}
          placeholder="Type text*"
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
        ></textarea>
        <button className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-md transition duration-300">
          Submit feedback
        </button>
      </div>
 
      {/* Info Boxes */}
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        <div className="bg-white shadow-md rounded-md p-4 border border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-1">Report a Safety Emergency</h3>
          <p className="text-sm text-gray-600 mb-2">
            We are committed to the safety of everyone using Zomato.
          </p>
          <a href="#" className="text-red-500 font-medium text-sm hover:underline">
            Report here
          </a>
        </div>
 
        <div className="bg-white shadow-md rounded-md p-4 border border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-1">Issue with your live order?</h3>
          <p className="text-sm text-gray-600">
            Click on the 'Support' or 'Online ordering help' section in your app to connect to our customer support team.
          </p>
        </div>
      </div>
    </div>
  )
}
 
export default Contact