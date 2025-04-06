// routes/trackingRoutes.js
const express = require("express");
const router = express.Router();

let students = [
  {
    _id: "1",
    name: "Harshith Raj",
    isPresent: false,
    lastCheckIn: null,
    lastCheckOut: null,
  },
  {
    _id: "2",
    name: "Aarav Singh",
    isPresent: false,
    lastCheckIn: null,
    lastCheckOut: null,
  },
  {
    _id: "3",
    name: "Zoya Mehra",
    isPresent: false,
    lastCheckIn: null,
    lastCheckOut: null,
  },
];

module.exports = (io) => {
  // Get all students
  router.get("/students", (req, res) => {
    res.json(students);
  });

  // Check-in endpoint
  router.post("/checkin", (req, res) => {
    const { studentId } = req.body;
    const student = students.find((s) => s._id === studentId);
    if (student) {
      student.isPresent = true;
      student.lastCheckIn = new Date();
      io.emit("update");
      return res.json({ success: true });
    }
    return res.status(404).json({ error: "Student not found" });
  });

  // Check-out endpoint
  router.post("/checkout", (req, res) => {
    const { studentId } = req.body;
    const student = students.find((s) => s._id === studentId);
    if (student) {
      student.isPresent = false;
      student.lastCheckOut = new Date();
      io.emit("update");
      return res.json({ success: true });
    }
    return res.status(404).json({ error: "Student not found" });
  });

  return router;
};
