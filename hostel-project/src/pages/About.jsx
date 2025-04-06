// src/pages/AboutUs.jsx
import React from "react";

function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-800">About Us</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Image Section */}
            <div className="flex justify-center">
              <img
                src="/aboutus.jpeg"
                alt="About Smart Hostel"
                className="w-full max-w-lg rounded-lg shadow-2xl transform hover:scale-105 transition duration-300"
              />
            </div>
            {/* Text Content */}
            <div className="space-y-6">
              <p className="text-xl text-gray-700">
                Welcome to <span className="font-bold">Smart Hostel</span> –
                your one-stop digital solution for modern hostel management! Our
                mission is to simplify and streamline the hostel experience for
                both students and administrators.
              </p>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  What We Do
                </h2>
                <ul className="list-disc pl-5 text-lg text-gray-700 space-y-2">
                  <li>Online Room Booking</li>
                  <li>Real-time Attendance Monitoring</li>
                  <li>Automated Fee Payment</li>
                  <li>Mess Menu Planning</li>
                  <li>Feedback & Complaints Management</li>
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Our Vision
                </h2>
                <p className="text-lg text-gray-700">
                  We aim to make hostel life smarter, more organized, and
                  digitally connected so students can focus more on their
                  academics and growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-inner">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-gray-600">
          © {new Date().getFullYear()} Smart Hostel. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default About;
