// src/pages/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

function Dashboard() {
  // Retrieve user details from localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const username = user?.username || "Guest";

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white bg-opacity-90 backdrop-blur-md shadow-lg">
        <h1 className="text-4xl font-extrabold text-blue-800">Dashboard</h1>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            {/* Enhanced User Icon */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-200 to-blue-500 flex items-center justify-center shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4z" />
              </svg>
            </div>

            {/* Username */}
            <span className="text-xl font-semibold text-gray-800">
              {username}
            </span>
          </div>
          <LogoutButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Room Booking Card */}
          <Link
            to="/room-booking"
            className="transform bg-white rounded-xl shadow-lg p-8 hover:scale-105 transition duration-300 hover:shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-3">
              Room Booking
            </h2>
            <p className="text-gray-600">
              Book and manage your hostel room online.
            </p>
          </Link>

          {/* Complaint System Card */}
          <Link
            to="/complaints"
            className="transform bg-white rounded-xl shadow-lg p-8 hover:scale-105 transition duration-300 hover:shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-3">
              Complaint System
            </h2>
            <p className="text-gray-600">
              Raise and track complaints for hostel facilities.
            </p>
          </Link>

          {/* Attendance Management Card */}
          <Link
            to="/attendance"
            className="transform bg-white rounded-xl shadow-lg p-8 hover:scale-105 transition duration-300 hover:shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-3">
              Attendance Management
            </h2>
            <p className="text-gray-600">
              Check in/out records and leave requests.
            </p>
          </Link>

          {/* Fee Payment Card */}
          <Link
            to="/fee-payment"
            className="transform bg-white rounded-xl shadow-lg p-8 hover:scale-105 transition duration-300 hover:shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-3">
              Fee Payment
            </h2>
            <p className="text-gray-600">
              Pay hostel fees and view payment history.
            </p>
          </Link>

          {/* Mess Menu Card */}
          <Link
            to="/mess-menu"
            className="transform bg-white rounded-xl shadow-lg p-8 hover:scale-105 transition duration-300 hover:shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-3">Mess Menu</h2>
            <p className="text-gray-600">
              View daily meal options and submit feedback.
            </p>
          </Link>

          {/* Feedback System Card
          <Link
            to="/feedback"
            className="transform bg-white rounded-xl shadow-lg p-8 hover:scale-105 transition duration-300 hover:shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-3">
              Feedback System
            </h2>
            <p className="text-gray-600">
              Submit and review feedback for continuous improvement.
            </p>
          </Link> */}

          {/* Tracking Dashboard Card */}
          <Link
            to="/tracking"
            className="transform bg-white rounded-xl shadow-lg p-8 hover:scale-105 transition duration-300 hover:shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-3">
              Tracking Dashboard
            </h2>
            <p className="text-gray-600">
              Monitor real-time student presence and occupancy.
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
