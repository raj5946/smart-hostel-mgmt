// src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Carousel images (assumed to be in the public folder)

const images = [
  "./hostel-air.jpeg",
  "./hostel-front.jpeg",
  "./hostel-room.jpeg",
];

function Carousel() {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 5000);
    return () => clearInterval(interval);
  }, [length]);

  return (
    <div className="relative w-full h-[100vh] overflow-hidden">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-2000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={img}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text contrast */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
      ))}
      {/* Gradient overlay at the bottom to create a shaded transition */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent pointer-events-none"></div>
      <button
        onClick={() => setCurrent((current - 1 + length) % length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 text-gray-800 rounded-full p-3"
      >
        &#10094;
      </button>
      <button
        onClick={() => setCurrent((current + 1) % length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 text-gray-800 rounded-full p-3"
      >
        &#10095;
      </button>
    </div>
  );
}

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Navigation Bar */}
      <nav className="absolute w-full z-30 top-0 left-0 p-6 flex justify-center">
        <div className="text-white text-2xl font-bold">
          Hostel Management | VNRVJIET
        </div>
      </nav>

      {/* Hero Section with Carousel */}
      <header className="relative">
        <Carousel />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-white drop-shadow-lg text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            Welcome to the Future of Hostel Management
          </h1>
          <p className="mt-4 text-white drop-shadow-md text-lg sm:text-xl max-w-2xl">
            Experience seamless operations, innovative solutions, and unmatched
            convenience.
          </p>
          <div className="mt-8 space-x-6">
            <Link
              to="/login"
              className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 transition"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-md shadow-lg hover:bg-gray-100 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Redesigned Content Section */}
      <main className="flex-grow bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">
            What Sets Us Apart
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Effortless Operation
              </h3>
              <p className="text-gray-600">
                Streamline your hostel management with intuitive design and
                automated processes.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Real-Time Insights
              </h3>
              <p className="text-gray-600">
                Monitor operations and occupancy in real time, ensuring timely
                decisions.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Unmatched Convenience
              </h3>
              <p className="text-gray-600">
                Enjoy user-friendly interfaces and comprehensive support to keep
                your operations smooth.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-5xl mx-auto px-4 py-6 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <Link
              to="/about"
              className="text-gray-300 hover:text-white transition"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-gray-300 hover:text-white transition"
            >
              Contact Us
            </Link>
            {/* <Link
              to="/feedback"
              className="text-gray-300 hover:text-white transition"
            >
              Feedback
            </Link> */}
          </div>
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Hostel Management System. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
