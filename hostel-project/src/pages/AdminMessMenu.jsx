// src/pages/AdminMessMenu.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminMessMenu() {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editedMenu, setEditedMenu] = useState({});

  useEffect(() => {
    // Fetch the current mess menu from the backend
    axios
      .get("http://localhost:3000/api/mess-menu")
      .then((res) => {
        setMenu(res.data);
        setEditedMenu(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching mess menu:", err);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    setEditedMenu({ ...editedMenu, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Send the updated menu to the backend
    axios
      .put("http://localhost:3000/api/mess-menu", editedMenu)
      .then((res) => {
        setMenu(res.data);
        alert("Menu updated successfully");
      })
      .catch((err) => console.error("Error updating menu:", err));
  };

  if (loading) return <p className="text-center text-xl mt-8">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 p-8">
      <h1 className="text-center text-5xl font-bold text-gray-800 mb-10 tracking-wide">
        Edit Today's Mess Menu
      </h1>
      <div className="max-w-3xl mx-auto bg-white bg-opacity-95 shadow-2xl rounded-2xl p-10">
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Date</label>
            <input
              type="text"
              name="date"
              value={editedMenu.date || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="YYYY-MM-DD"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Breakfast
            </label>
            <input
              type="text"
              name="breakfast"
              value={editedMenu.breakfast || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Breakfast menu"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Lunch
            </label>
            <input
              type="text"
              name="lunch"
              value={editedMenu.lunch || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Lunch menu"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Dinner
            </label>
            <input
              type="text"
              name="dinner"
              value={editedMenu.dinner || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Dinner menu"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Save Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminMessMenu;
