// src/components/LogoutButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the authentication token (and any other user info) from localStorage
    localStorage.removeItem("token");
    // Optionally, remove any other items like user roles
    // Redirect to login page
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
