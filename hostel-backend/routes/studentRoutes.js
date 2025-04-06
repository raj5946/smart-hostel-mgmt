const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

module.exports = (io) => {
  router.get("/admin/students", studentController.getAllStudents);

  router.post("/checkin", (req, res) => {
    studentController.checkInStudent(req, res, io);
  });

  router.post("/checkout", (req, res) => {
    studentController.checkOutStudent(req, res, io);
  });

  return router;
};
