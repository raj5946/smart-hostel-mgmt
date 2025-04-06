// models/Feedback.js
const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    breakfastRating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    lunchRating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    dinnerRating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      default: "",
    },
    image: {
      type: String, // This field will store the URL or file path of the uploaded image.
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
