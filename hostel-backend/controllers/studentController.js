const Student = require("../models/Student");

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json({ success: true, students });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch students" });
  }
};

exports.checkInStudent = async (req, res, io) => {
  try {
    const { studentId } = req.body;
    const student = await Student.findByIdAndUpdate(
      studentId,
      { isPresent: true, lastCheckIn: new Date() },
      { new: true }
    );
    io.emit("update", student);
    res.json(student);
  } catch (error) {
    res.status(500).json({ success: false, message: "Check-in failed" });
  }
};

exports.checkOutStudent = async (req, res, io) => {
  try {
    const { studentId } = req.body;
    const student = await Student.findByIdAndUpdate(
      studentId,
      { isPresent: false, lastCheckOut: new Date() },
      { new: true }
    );
    io.emit("update", student);
    res.json(student);
  } catch (error) {
    res.status(500).json({ success: false, message: "Check-out failed" });
  }
};
