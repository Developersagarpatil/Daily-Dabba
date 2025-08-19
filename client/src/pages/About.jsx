import React from "react";

const About = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white shadow">
        <div className="text-2xl font-bold text-orange-500">Daily-Dabba</div>
        <nav className="hidden md:flex gap-4 text-sm">
          <a href="#">Products</a>
          <a href="#">Company</a>
          <a href="#">Impact</a>
          <a href="#">Advertise</a>
          <a href="#">News</a>
          <a href="#">Blog</a>
          <a href="#">Help</a>
        </nav>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-full">
          Get Started
        </button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between p-8 bg-pink-50">
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">Your Door to More</h1>
          <p className="text-gray-600">
            At Daily-Dabba, our mission is to empower and grow local economies
            by opening the doors that connect us to each other. When you order
            something you need, local merchants get business, and Dashers get
            paid.
          </p>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0">
          <img
            src="https://source.unsplash.com/500x400/?delivery"
            alt="Daily-Dabba Hero"
            className="rounded-xl"
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold mb-2">Restaurants</h2>
          <p className="text-gray-500 mb-4">
            Discover and order from your favorite restaurants.
          </p>
          <button className="bg-red-600 text-white px-4 py-2 rounded-full">
            Start an Order
          </button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold mb-2">Fresh Meal</h2>
          <p className="text-gray-500 mb-4">
            Fresh and Healthy food delivered to your door.
          </p>
          <button className="bg-red-600 text-white px-4 py-2 rounded-full">
            Shop Grocery
          </button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold mb-2">Convenience</h2>
          <p className="text-gray-500 mb-4">
            Essentials from your neighborhood stores delivered fast.
          </p>
          <button className="bg-red-600 text-white px-4 py-2 rounded-full">
            Shop Convenience
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-6 mt-10">
        <div className="text-center">
          <p>© 2025 Daily-Dabba. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
