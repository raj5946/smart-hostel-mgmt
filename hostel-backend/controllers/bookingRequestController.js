// controllers/bookingRequestController.js
const Room = require("../models/Room");
const BookingRequest = require("../models/BookingRequest");

exports.createBookingRequest = (req, res) => {
  try {
    const { roomId, studentId, studentName } = req.body;
    // Ensure the student does not have an existing pending/approved request
    const existing = BookingRequest.getRequestByStudentId(studentId);
    if (existing && existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Student already has a pending or approved booking request.",
      });
    }
    const request = BookingRequest.createRequest(
      roomId,
      studentId,
      studentName
    );
    res.json({
      success: true,
      message: "Booking request created successfully.",
      request,
    });
  } catch (error) {
    console.error("Error creating booking request:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getPendingBookingRequests = (req, res) => {
  try {
    const requests = BookingRequest.getPendingRequests();
    res.json({ success: true, requests });
  } catch (error) {
    console.error("Error fetching pending booking requests:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.approveBookingRequest = (req, res) => {
  try {
    const requestId = parseInt(req.params.id);
    const request = BookingRequest.getRequestById(requestId);
    if (!request) {
      return res
        .status(404)
        .json({ success: false, message: "Booking request not found." });
    }
    if (request.status !== "pending") {
      return res
        .status(400)
        .json({ success: false, message: "Booking request is not pending." });
    }
    // Ensure the room is still available
    const room = Room.findRoomById(request.roomId);
    if (!room || room.isBooked) {
      return res
        .status(400)
        .json({ success: false, message: "Room is not available." });
    }
    // Approve request and update room status
    BookingRequest.updateRequestStatus(requestId, "approved");
    Room.bookRoom(request.roomId, request.studentId, request.studentName);
    res.json({
      success: true,
      message: "Booking request approved and room booked.",
      request,
    });
  } catch (error) {
    console.error("Error approving booking request:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.rejectBookingRequest = (req, res) => {
  try {
    const requestId = parseInt(req.params.id);
    const request = BookingRequest.getRequestById(requestId);
    if (!request) {
      return res
        .status(404)
        .json({ success: false, message: "Booking request not found." });
    }
    if (request.status !== "pending") {
      return res
        .status(400)
        .json({ success: false, message: "Booking request is not pending." });
    }
    BookingRequest.updateRequestStatus(requestId, "rejected");
    res.json({ success: true, message: "Booking request rejected.", request });
  } catch (error) {
    console.error("Error rejecting booking request:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.checkStudentBookingStatus = (req, res) => {
  try {
    const studentId = req.params.studentId;
    const requests = BookingRequest.getRequestByStudentId(studentId);

    const request = requests?.find(
      (r) => (r.status === "approved" || r.status === "rejected") && !r.notified
    );

    if (request) {
      request.notified = true;

      const room = Room.findRoomById(request.roomId);

      return res.json({
        success: true,
        statusUpdate: {
          status: request.status,
          roomNumber: room?.roomNumber || request.roomId,
        },
      });
    }

    return res.json({ success: true }); // no update
  } catch (error) {
    console.error("Error checking student booking status:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
