// controllers/complaintController.js
const Complaint = require("../models/Complaint");
const Staff = require("../models/Staff");

// Student submits a complaint
const createComplaint = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const imagePath = req.file ? req.file.path : "";
    const newComplaint = await Complaint.create({
      user: req.user.id, // Assumes verifyToken middleware sets req.user
      title,
      description,
      category,
      image: imagePath,
    });
    res.status(201).json(newComplaint);
  } catch (error) {
    console.error("Error creating complaint:", error);
    res.status(500).json({ message: "Server error while creating complaint" });
  }
};

// Get complaints – admin gets all; user gets only their own
const getComplaints = async (req, res) => {
  try {
    // For admin, query should be {} to fetch all complaints.
    // For a student, it should be { user: req.user.id }.
    const query = req.user.role === "admin" ? {} : { user: req.user.id };
    const complaints = await Complaint.find(query).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ message: "Server error while fetching complaints" });
  }
};

// Get single complaint details (for admin or student)
const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate(
      "assignedStaff"
    );
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    // Allow admin to view all complaints; if not admin, restrict to their own
    if (
      req.user.role !== "admin" &&
      complaint.user.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Access denied" });
    }
    res.json(complaint);
  } catch (error) {
    console.error("Error fetching complaint:", error);
    res.status(500).json({ message: "Server error while fetching complaint" });
  }
};

// Admin assigns a staff member and marks complaint as "in-progress"
const assignComplaint = async (req, res) => {
  try {
    const { staffName } = req.body; // staffName provided by admin via dropdown selection
    // Find the staff member by name
    const staff = await Staff.findOne({ name: staffName });
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }
    // Update the complaint with the found staff's _id and mark as in-progress
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { assignedStaff: staff._id, status: "in-progress" },
      { new: true }
    );
    if (!updatedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.json(updatedComplaint);
  } catch (error) {
    console.error("Error assigning complaint:", error);
    res.status(500).json({ message: "Server error while assigning complaint" });
  }
};

// Admin marks a complaint as "resolved"
const resolveComplaint = async (req, res) => {
  try {
    const { resolutionComment } = req.body;
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status: "resolved", resolutionComment },
      { new: true }
    );
    if (!updatedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    // Optionally, notify the user that the complaint has been resolved.
    res.json(updatedComplaint);
  } catch (error) {
    console.error("Error resolving complaint:", error);
    res.status(500).json({ message: "Server error while resolving complaint" });
  }
};

// New endpoint: Retrieve list of staff members (by name) for the dropdown
const getStaffList = async (req, res) => {
  try {
    // Fetch all staff documents, only returning the 'name' field (and _id by default)
    const staffList = await Staff.find({}, "name");
    res.json(staffList);
  } catch (error) {
    console.error("Error fetching staff list:", error);
    res.status(500).json({ message: "Server error while fetching staff list" });
  }
};

module.exports = {
  createComplaint,
  getComplaints,
  getComplaintById,
  assignComplaint,
  resolveComplaint,
  getStaffList, // Export the new endpoint
};
