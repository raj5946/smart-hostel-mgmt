// controllers/roomController.js
const Room = require("../models/Room");

exports.getAvailableRooms = (req, res) => {
  try {
    const availableRooms = Room.getAvailableRooms();
    res.json({ success: true, rooms: availableRooms });
  } catch (error) {
    console.error("Error fetching available rooms:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.bookRoom = (req, res) => {
  try {
    const { roomId, studentId, studentName } = req.body;

    // Check if the student already booked a room
    const existingBookings = Room.getRoomsByStudentId(studentId);
    if (existingBookings && existingBookings.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Student has already booked a room.",
      });
    }

    // Attempt to book the room if student hasn't booked yet
    const room = Room.bookRoom(roomId, studentId, studentName);
    if (room) {
      res.json({
        success: true,
        message: "Room booked successfully",
        room,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Room is not available or does not exist",
      });
    }
  } catch (error) {
    console.error("Error booking room:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Admin endpoint to view all rooms (with occupant details if booked)
exports.adminGetAllRooms = (req, res) => {
  try {
    const rooms = Room.getAllRooms();
    res.json({ success: true, rooms });
  } catch (error) {
    console.error("Error fetching rooms for admin:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// (Optional) Student endpoint to view their booking(s)
exports.getMyRoomBooking = (req, res) => {
  try {
    const studentId = req.params.studentId;
    const myRooms = Room.getRoomsByStudentId(studentId);
    res.json({ success: true, rooms: myRooms });
  } catch (error) {
    console.error("Error fetching my booking:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
