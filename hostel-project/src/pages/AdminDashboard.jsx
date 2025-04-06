// src/pages/AdminDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white shadow">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <LogoutButton />
      </header>

      {/* Main Content */}
      <main className="p-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mess Menu Card */}
          <Link
            to="/admin/mess-menu"
            className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Edit Mess Menu
            </h2>
            <p className="text-gray-600">
              Update the daily meal options for the hostel.
            </p>
          </Link>

          {/* Feedback Card */}
          <Link
            to="/admin/feedback"
            className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              View Feedback
            </h2>
            <p className="text-gray-600">
              Review user-submitted feedback and ratings for the meals.
            </p>
          </Link>

          {/* Complaints Card */}
          <Link
            to="/admin/complaint"
            className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              View Complaints
            </h2>
            <p className="text-gray-600">
              Review and manage complaints raised by students.
            </p>
          </Link>

          {/* Room Allocation & Booking Card */}
          <Link
            to="/admin/rooms"
            className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <h2 className="text-2xl font-bold text-purple-600 mb-4">
              Room Allocation & Booking
            </h2>
            <p className="text-gray-600">
              View and manage room allocations and booking details.
            </p>
          </Link>
          <Link
            to="/admin/leave-requests"
            className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">
              Leave Requests
            </h2>
            <p className="text-gray-600">
              Review and manage student leave submissions.
            </p>
          </Link>
          {/* <Link
            to="/tracker"
            className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <h2 className="text-2xl font-bold text-purple-600 mb-4">
              Real-Time Presence
            </h2>
            <p className="text-gray-600">
              Monitor real-time check-ins and occupancy status.
            </p>
          </Link> */}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
