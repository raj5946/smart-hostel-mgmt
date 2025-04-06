// src/components/AdminProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  // Retrieve authentication token and role from localStorage
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // If no token or role is not admin, redirect to login
  if (!token || role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
