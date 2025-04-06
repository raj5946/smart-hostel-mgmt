// routes/leaveRoutes.js
const express = require("express");
const router = express.Router();

let leaveRequests = [];

router.post("/request", (req, res) => {
  const { rollNo, reason } = req.body;
  if (!rollNo || !reason) {
    return res.status(400).json({ message: "Missing roll no or reason" });
  }

  const request = {
    id: Date.now(),
    rollNo,
    reason,
    status: "pending",
  };
  leaveRequests.push(request);
  res.json({ success: true, message: "Leave request submitted", request });
});

// Admin: GET all leave requests
router.get("/requests", (req, res) => {
  res.json(leaveRequests);
});

// Admin: Approve/Reject
router.post("/requests/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const request = leaveRequests.find((r) => r.id == id);
  if (!request) return res.status(404).json({ message: "Request not found" });

  request.status = status;
  res.json({ success: true, message: `Request ${status}` });
});

module.exports = router;
