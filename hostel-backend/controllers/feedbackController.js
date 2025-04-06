// controllers/feedbackController.js
const Feedback = require("../models/Feedback");

// Get all feedback (sorted by newest first)
const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({}).sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create new feedback
const createFeedback = async (req, res) => {
  try {
    // Extract ratings and feedback text from the request body
    const { breakfastRating, lunchRating, dinnerRating, comment } = req.body;
    // If using Multer, req.file contains the uploaded image
    const imagePath = req.file ? req.file.path : "";

    const newFeedback = await Feedback.create({
      user: req.user && req.user.id, // Adjust based on your authentication middleware
      breakfastRating: Number(breakfastRating),
      lunchRating: Number(lunchRating),
      dinnerRating: Number(dinnerRating),
      comment,
      image: imagePath,
    });

    res.status(201).json(newFeedback);
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);
  } catch (error) {
    console.error("Error creating feedback:", error);
    res.status(500).json({ message: "Server error while creating feedback" });
  }
};

// Delete feedback (admin only)
const deleteFeedback = async (req, res) => {
  try {
    const feedbackId = req.params.id;
    await Feedback.findByIdAndDelete(feedbackId);
    res.json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getFeedbacks,
  createFeedback,
  deleteFeedback,
};
