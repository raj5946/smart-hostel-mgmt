// routes/bookingRequestRoutes.js
const express = require("express");
const router = express.Router();
const bookingRequestController = require("../controllers/bookingRequestController");
const BookingRequest = require("../models/BookingRequest");

router.post("/request", bookingRequestController.createBookingRequest);
router.get("/requests", bookingRequestController.getPendingBookingRequests);
router.post(
  "/requests/:id/approve",
  bookingRequestController.approveBookingRequest
);
router.post(
  "/requests/:id/reject",
  bookingRequestController.rejectBookingRequest
);

// routes/bookingRequestRoutes.js
router.get("/my-status/:studentId", (req, res) => {
  const studentId = req.params.studentId;
  const request = bookingRequests.find(
    (r) =>
      r.studentId === studentId &&
      (r.status === "approved" || r.status === "rejected")
  );

  if (request && !request.notified) {
    request.notified = true;
    return res.json({
      success: true,
      statusUpdate: {
        status: request.status,
        roomNumber: request.roomId, // replace with roomNumber if available
      },
    });
  }

  return res.json({ success: true });
});

router.get(
  "/my-status/:studentId",
  bookingRequestController.checkStudentBookingStatus
);

module.exports = router;
