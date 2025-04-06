// src/pages/UserMessMenu.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

// StarRating component for selecting a rating (1 to 5 stars)
const StarRating = ({ rating, onChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          className="focus:outline-none"
        >
          <span
            className={`text-2xl ${
              star <= (hoverRating || rating)
                ? "text-yellow-500"
                : "text-gray-300"
            }`}
          >
            ★
          </span>
        </button>
      ))}
    </div>
  );
};

function UserMessMenu() {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);

  // Rating and feedback states for each meal
  const [breakfastRating, setBreakfastRating] = useState(0);
  const [lunchRating, setLunchRating] = useState(0);
  const [dinnerRating, setDinnerRating] = useState(0);

  // Additional feedback state (common for all meals)
  const [additionalFeedback, setAdditionalFeedback] = useState("");
  const [feedbackImage, setFeedbackImage] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/mess-menu")
      .then((res) => {
        setMenu(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching mess menu:", err);
        setLoading(false);
      });
  }, []);

  const handleImageChange = (e) => {
    setFeedbackImage(e.target.files[0]);
  };

  const handleFeedbackSubmit = async () => {
    // Create form data for feedback
    const formData = new FormData();
    formData.append("breakfastRating", breakfastRating);
    formData.append("lunchRating", lunchRating);
    formData.append("dinnerRating", dinnerRating);
    formData.append("comment", additionalFeedback);
    if (feedbackImage) {
      formData.append("image", feedbackImage);
    }
    try {
      await axios.post("http://localhost:3000/api/feedback", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Feedback submitted successfully!");
      // Reset feedback fields
      setBreakfastRating(0);
      setLunchRating(0);
      setDinnerRating(0);
      setAdditionalFeedback("");
      setFeedbackImage(null);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("There was an error submitting your feedback. Please try again.");
    }
  };

  if (loading) return <p className="text-center text-xl mt-8">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-orange-100 p-8">
      <h1 className="text-center text-5xl font-extrabold text-gray-800 mb-10 tracking-wide">
        Today's Delicacies
      </h1>
      {menu ? (
        <div className="max-w-4xl mx-auto bg-white bg-opacity-90 rounded-2xl shadow-2xl p-8 mb-10">
          <div className="flex justify-between items-center mb-6">
            <p className="text-lg text-gray-700 font-medium">
              Date: {menu.date}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Breakfast Card */}
            <div className="bg-yellow-50 rounded-xl shadow-lg p-4">
              <h2 className="text-2xl font-bold text-orange-600 mb-2">
                Breakfast
              </h2>
              <p className="text-lg text-gray-700 mb-4">{menu.breakfast}</p>
              <StarRating
                rating={breakfastRating}
                onChange={setBreakfastRating}
              />
            </div>
            {/* Lunch Card */}
            <div className="bg-green-50 rounded-xl shadow-lg p-4">
              <h2 className="text-2xl font-bold text-green-700 mb-2">Lunch</h2>
              <p className="text-lg text-gray-700 mb-4">{menu.lunch}</p>
              <StarRating rating={lunchRating} onChange={setLunchRating} />
            </div>
            {/* Dinner Card */}
            <div className="bg-red-50 rounded-xl shadow-lg p-4">
              <h2 className="text-2xl font-bold text-red-600 mb-2">Dinner</h2>
              <p className="text-lg text-gray-700 mb-4">{menu.dinner}</p>
              <StarRating rating={dinnerRating} onChange={setDinnerRating} />
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 italic">Bon Appétit!</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-xl mt-8">No menu available for today.</p>
      )}

      {/* Additional Feedback Form */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-4">
          Additional Feedback
        </h2>
        <textarea
          value={additionalFeedback}
          onChange={(e) => {
            console.log("Feedback comment:", e.target.value);
            setAdditionalFeedback(e.target.value);
          }}
          className="w-full border border-gray-300 rounded-lg p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Share your comments, queries, or suggestions..."
          rows="4"
        ></textarea>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Upload an image (optional)
          </label>
          <input type="file" onChange={handleImageChange} className="w-full" />
        </div>
        <button
          onClick={handleFeedbackSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
}

export default UserMessMenu;
