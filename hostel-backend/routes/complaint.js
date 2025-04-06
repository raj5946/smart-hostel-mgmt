// routes/complaint.js
const express = require("express");
const router = express.Router();
const {
  createComplaint,
  getComplaints,
  getComplaintById,
  assignComplaint,
  resolveComplaint,
} = require("../controllers/complaintController");
const { verifyToken } = require("../middleware/authMiddleware");
const adminVerify = require("../middleware/adminVerify");
const upload = require("../middleware/upload");

// Student can submit a complaint (with optional image)
router.post("/", verifyToken, upload.single("image"), createComplaint);

// Get all complaints (admin sees all, student sees their own)
router.get("/", verifyToken, getComplaints);

// Get a specific complaint's details
router.get("/:id", verifyToken, getComplaintById);

// Admin can assign a staff member (and mark as in-progress)
router.put("/:id/assign", verifyToken, adminVerify, assignComplaint);

// Admin can mark a complaint as resolved
router.put("/:id/resolve", verifyToken, adminVerify, resolveComplaint);

module.exports = router;
