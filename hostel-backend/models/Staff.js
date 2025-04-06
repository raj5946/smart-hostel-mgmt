// models/Staff.js
const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: "",
    },
    // Add more fields if needed
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staff", staffSchema);
