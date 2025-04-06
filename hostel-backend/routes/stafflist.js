const express = require("express");
const router = express.Router();
const { getStaffList } = require("../controllers/complaintController"); // or staffController if separate

router.get("/", getStaffList);

module.exports = router;
