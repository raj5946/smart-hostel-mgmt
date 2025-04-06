// src/pages/LoginPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const [loginType, setLoginType] = useState("user"); // "user" or "admin"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  // Validate form fields
  const validateForm = () => {
    const formErrors = {};
    if (!email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Email address is invalid";
    }
    if (!password) {
      formErrors.password = "Password is required";
    }
    return formErrors;
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      setIsSubmitting(true);
      // Adjust URL based on login type if needed
      const endpoint =
        loginType === "admin"
          ? "http://localhost:3000/api/auth/admin/login"
          : "http://localhost:3000/api/auth/login";
      const response = await axios.post(endpoint, { email, password });

      // Destructure token and user info from response
      const { token, user } = response.data;

      // Store token and, if available, the user details in localStorage
      localStorage.setItem("token", token);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      // Set role in localStorage and navigate based on login type
      if (loginType === "admin") {
        localStorage.setItem("role", "admin");
        navigate("/admin/dashboard", { replace: true });
      } else {
        localStorage.setItem("role", "user");
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setApiError(error.response.data.message);
      } else {
        setApiError("Failed to login. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-indigo-200 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        {/* Toggle Tabs for User / Admin */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setLoginType("user")}
            className={`flex items-center px-4 py-2 border rounded-l-lg focus:outline-none transition ${
              loginType === "user"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-100 text-gray-700 border-gray-300"
            }`}
          >
            {/* User Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A9 9 0 1118.364 6.363M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            User
          </button>
          <button
            onClick={() => setLoginType("admin")}
            className={`flex items-center px-4 py-2 border rounded-r-lg focus:outline-none transition ${
              loginType === "admin"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-100 text-gray-700 border-gray-300"
            }`}
          >
            {/* Admin Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c0-2.21 1.79-4 4-4m0 0c2.21 0 4 1.79 4 4m-4-4v12m0 0H8m4 0h4"
              />
            </svg>
            Admin
          </button>
        </div>

        <h2 className="text-2xl font-bold text-center mb-4">
          {loginType === "user" ? "User Login" : "Admin Login"}
        </h2>
        {apiError && (
          <div className="bg-red-100 text-red-600 text-center py-2 px-4 rounded mb-4">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
