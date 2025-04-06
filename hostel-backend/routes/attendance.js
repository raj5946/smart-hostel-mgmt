const express = require("express");
const router = express.Router();
const multer = require("multer");
const Attendance = require("../models/Attendance");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  const { rollNo } = req.body;
  const imagePath = req.file.path;

  const attendance = new Attendance({ rollNo, imagePath });
  await attendance.save();

  res.json(attendance);
});

router.get("/", async (req, res) => {
  const records = await Attendance.find().sort({ time: -1 });
  res.json(records);
});

module.exports = router;
