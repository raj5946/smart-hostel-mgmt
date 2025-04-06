// routes/feedback.js
const express = require("express");
const router = express.Router();
const {
  getFeedbacks,
  createFeedback,
  deleteFeedback,
} = require("../controllers/feedbackController");
const upload = require("../middleware/upload");
const { verifyToken } = require("../middleware/authMiddleware");

// GET /api/feedback
router.get("/", verifyToken, getFeedbacks);

// POST /api/feedback with file upload (field name "image")
router.post("/", verifyToken, upload.single("image"), createFeedback);

// DELETE /api/feedback/:id (admin only)
router.delete("/:id", verifyToken, deleteFeedback);

module.exports = router;
