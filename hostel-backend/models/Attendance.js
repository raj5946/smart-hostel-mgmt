const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  rollNo: String,
  imagePath: String,
  time: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
