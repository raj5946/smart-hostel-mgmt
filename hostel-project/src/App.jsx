import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

// User Pages
import RoomBookingPage from "./pages/RoomBookingPage.jsx";
import ComplaintsPage from "./pages/ComplaintsPage.jsx";
import UserComplaintList from "./pages/UserComplaintList.jsx";
import AttendancePage from "./pages/AttendancePage.jsx";
import FeePaymentPage from "./pages/FeePaymentPage.jsx";
import MessMenuPage from "./pages/MessMenuPage.jsx";
import FeedbackPage from "./pages/FeedbackPage.jsx";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminMessMenu from "./pages/AdminMessMenu.jsx";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminFeedback from "./pages/AdminFeedback.jsx";
import AdminComplaintDetails from "./pages/AdminComplaintDetails.jsx"; // Ensure file name matches
import AdminComplaintList from "./pages/AdminComplaintList.jsx";
import AdminRoomDashboard from "./pages/AdminRoomDashboard.jsx";
import AdminLeaveDashboard from "./pages/AdminLeaveDashboard";
import AdminPresenceTracker from "./pages/AdminPresenceTracker";

// import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected or Authenticated Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/room-booking"
          element={
            <ProtectedRoute>
              <RoomBookingPage />
            </ProtectedRoute>
          }
        />

        {/* Complaints */}
        <Route
          path="/complaints"
          element={
            <ProtectedRoute>
              <ComplaintsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-complaints"
          element={
            <ProtectedRoute>
              <UserComplaintList />
            </ProtectedRoute>
          }
        />

        {/* Attendance Management */}
        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <AttendancePage />
            </ProtectedRoute>
          }
        />

        {/* Fee Payment */}
        <Route
          path="/fee-payment"
          element={
            <ProtectedRoute>
              <FeePaymentPage />
            </ProtectedRoute>
          }
        />

        {/* Mess Menu */}
        <Route
          path="/mess-menu"
          element={
            <ProtectedRoute>
              <MessMenuPage />
            </ProtectedRoute>
          }
        />

        {/* Feedback System */}
        <Route
          path="/feedback"
          element={
            <ProtectedRoute>
              <FeedbackPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tracking"
          element={
            <ProtectedRoute>
              <AdminPresenceTracker />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/mess-menu"
          element={
            <AdminProtectedRoute>
              <AdminMessMenu />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/feedback"
          element={
            <AdminProtectedRoute>
              <AdminFeedback />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/complaint"
          element={
            <AdminProtectedRoute>
              <AdminComplaintList />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/complaint/:id"
          element={
            <AdminProtectedRoute>
              <AdminComplaintDetails />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/rooms"
          element={
            <AdminProtectedRoute>
              <AdminRoomDashboard />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/leave-requests"
          element={
            <AdminProtectedRoute>
              <AdminLeaveDashboard />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/tracking"
          element={
            <AdminProtectedRoute>
              <AdminPresenceTracker />
            </AdminProtectedRoute>
          }
        />

        {/* Uncomment this if you have a NotFoundPage component */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
