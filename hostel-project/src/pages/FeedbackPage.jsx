// src/pages/FeedbackPage.jsx
import React, { useState } from "react";
import axios from "axios";

function FeedbackPage() {
  const [breakfastFeedback, setBreakfastFeedback] = useState({
    rating: "",
    comment: "",
    image: null,
  });
  const [lunchFeedback, setLunchFeedback] = useState({
    rating: "",
    comment: "",
    image: null,
  });
  const [dinnerFeedback, setDinnerFeedback] = useState({
    rating: "",
    comment: "",
    image: null,
  });

  const handleFileChange = (e, meal) => {
    const file = e.target.files[0];
    if (meal === "breakfast") {
      setBreakfastFeedback({ ...breakfastFeedback, image: file });
    } else if (meal === "lunch") {
      setLunchFeedback({ ...lunchFeedback, image: file });
    } else if (meal === "dinner") {
      setDinnerFeedback({ ...dinnerFeedback, image: file });
    }
  };

  const handleSubmit = async (mealType) => {
    let feedbackData;
    if (mealType === "breakfast") {
      feedbackData = breakfastFeedback;
    } else if (mealType === "lunch") {
      feedbackData = lunchFeedback;
    } else if (mealType === "dinner") {
      feedbackData = dinnerFeedback;
    }

    // Prepare form data for image upload
    const formData = new FormData();
    formData.append("mealType", mealType);
    formData.append("rating", feedbackData.rating);
    formData.append("comment", feedbackData.comment);
    if (feedbackData.image) {
      formData.append("image", feedbackData.image);
    }

    try {
      await axios.post("http://localhost:3000/api/feedback", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });
      alert(`Feedback for ${mealType} submitted successfully`);
      // Reset state for the specific meal feedback
      if (mealType === "breakfast") {
        setBreakfastFeedback({ rating: "", comment: "", image: null });
      } else if (mealType === "lunch") {
        setLunchFeedback({ rating: "", comment: "", image: null });
      } else if (mealType === "dinner") {
        setDinnerFeedback({ rating: "", comment: "", image: null });
      }
    } catch (error) {
      console.error("Error submitting feedback", error);
      alert("Error submitting feedback");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-8">
      <h1 className="text-center text-5xl font-bold text-gray-800 mb-12 tracking-wide">
        Meal Feedback
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Breakfast Feedback Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <h2 className="text-2xl font-bold text-yellow-600 mb-4">Breakfast</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Rating (1-5)</label>
            <select
              value={breakfastFeedback.rating}
              onChange={(e) =>
                setBreakfastFeedback({
                  ...breakfastFeedback,
                  rating: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="">Select Rating</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Comment</label>
            <textarea
              value={breakfastFeedback.comment}
              onChange={(e) =>
                setBreakfastFeedback({
                  ...breakfastFeedback,
                  comment: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Share your thoughts..."
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Upload Image</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, "breakfast")}
              className="w-full"
            />
          </div>
          <button
            onClick={() => handleSubmit("breakfast")}
            className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 transition"
          >
            Submit Breakfast Feedback
          </button>
        </div>

        {/* Lunch Feedback Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Lunch</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Rating (1-5)</label>
            <select
              value={lunchFeedback.rating}
              onChange={(e) =>
                setLunchFeedback({ ...lunchFeedback, rating: e.target.value })
              }
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="">Select Rating</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Comment</label>
            <textarea
              value={lunchFeedback.comment}
              onChange={(e) =>
                setLunchFeedback({ ...lunchFeedback, comment: e.target.value })
              }
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Share your thoughts..."
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Upload Image</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, "lunch")}
              className="w-full"
            />
          </div>
          <button
            onClick={() => handleSubmit("lunch")}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Submit Lunch Feedback
          </button>
        </div>

        {/* Dinner Feedback Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Dinner</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Rating (1-5)</label>
            <select
              value={dinnerFeedback.rating}
              onChange={(e) =>
                setDinnerFeedback({ ...dinnerFeedback, rating: e.target.value })
              }
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="">Select Rating</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Comment</label>
            <textarea
              value={dinnerFeedback.comment}
              onChange={(e) =>
                setDinnerFeedback({
                  ...dinnerFeedback,
                  comment: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Share your thoughts..."
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Upload Image</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, "dinner")}
              className="w-full"
            />
          </div>
          <button
            onClick={() => handleSubmit("dinner")}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            Submit Dinner Feedback
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedbackPage;
