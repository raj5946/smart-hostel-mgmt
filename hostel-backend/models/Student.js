const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  isPresent: { type: Boolean, default: false },
  lastCheckIn: Date,
  lastCheckOut: Date,
});

module.exports = mongoose.model("Student", studentSchema);
