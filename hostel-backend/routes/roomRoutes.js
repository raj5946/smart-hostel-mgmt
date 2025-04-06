// routes/roomRoutes.js
const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");

router.get("/available", roomController.getAvailableRooms);
router.post("/book", roomController.bookRoom);

// Admin view: get all rooms with occupant info
router.get("/admin", roomController.adminGetAllRooms);

// Optional: student view to get their room booking (studentId passed as URL param)
router.get("/mybooking/:studentId", roomController.getMyRoomBooking);

module.exports = router;
