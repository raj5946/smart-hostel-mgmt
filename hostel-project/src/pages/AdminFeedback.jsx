// src/pages/AdminFeedback.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/feedback", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("Feedback data:", res.data);
        setFeedbacks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching feedback:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-xl mt-8">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-center text-4xl font-bold mb-8">User Feedback</h1>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {feedbacks.length > 0 ? (
          feedbacks.map((fb) => (
            <div key={fb._id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Meal Ratings</h2>
                <p className="text-gray-700">
                  <strong>Breakfast Rating:</strong> {fb.breakfastRating || 0} /
                  5
                </p>
                <p className="text-gray-700">
                  <strong>Lunch Rating:</strong> {fb.lunchRating || 0} / 5
                </p>
                <p className="text-gray-700">
                  <strong>Dinner Rating:</strong> {fb.dinnerRating || 0} / 5
                </p>
              </div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Feedback</h2>
                <p className="text-gray-800">
                  {fb.comment && fb.comment.trim() !== ""
                    ? fb.comment
                    : "No additional feedback provided."}
                </p>
              </div>
              {fb.image && fb.image.trim() !== "" && (
                <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">Image</h2>
                  <img
                    src={fb.image}
                    alt="Feedback"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              )}
              <p className="text-sm text-gray-500">
                Submitted on: {new Date(fb.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-xl">No feedback available.</p>
        )}
      </div>
    </div>
  );
}

export default AdminFeedback;
