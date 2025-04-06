// src/pages/ComplaintPage.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ComplaintsPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("other");
  const [image, setImage] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  // Persist notified complaint IDs between renders
  const notifiedComplaintsRef = useRef([]);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/api/complaint", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const fetchedComplaints = res.data;

      // Filter for resolved complaints that haven't been notified yet
      const newResolved = fetchedComplaints.filter(
        (complaint) =>
          complaint.status === "resolved" &&
          !notifiedComplaintsRef.current.includes(complaint._id)
      );

      if (newResolved.length > 0) {
        toast.success("One or more of your complaints have been resolved!");
        notifiedComplaintsRef.current = [
          ...notifiedComplaintsRef.current,
          ...newResolved.map((complaint) => complaint._id),
        ];
      }

      setComplaints(fetchedComplaints);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
    const interval = setInterval(fetchComplaints, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    if (image) {
      formData.append("image", image);
    }
    try {
      await axios.post("http://localhost:3000/api/complaint", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Complaint submitted successfully!");
      // Reset form fields
      setTitle("");
      setDescription("");
      setCategory("other");
      setImage(null);
      // Refresh the complaints list after submission
      fetchComplaints();
    } catch (error) {
      console.error("Error submitting complaint:", error);
      toast.error("Error submitting complaint. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 py-10">
      {/* Toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Complaint Submission Card */}
          <div className="flex-1 bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Report an Issue
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="room">Room</option>
                  <option value="cleanliness">Cleanliness</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Upload Image (optional)
                </label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Submit Complaint
              </button>
            </form>
          </div>
          {/* Complaints List Card */}
          <div className="flex-1 bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              My Complaints
            </h2>
            {loading ? (
              <p className="text-center text-gray-600">Loading complaints...</p>
            ) : complaints.length > 0 ? (
              <ul className="space-y-4">
                {complaints.map((complaint) => (
                  <li
                    key={complaint._id}
                    className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition duration-300"
                  >
                    <h3 className="text-xl font-semibold text-gray-800">
                      {complaint.title}
                    </h3>
                    <p className="text-gray-600">
                      <strong>Category:</strong> {complaint.category}
                    </p>
                    <p className="text-gray-600">
                      <strong>Status:</strong> {complaint.status}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-600">
                You have not submitted any complaints yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplaintsPage;
