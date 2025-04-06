// routes/mess.js
const express = require("express");
const router = express.Router();
const {
  getMessMenu,
  updateMessMenu,
} = require("../controllers/messController");

// GET /api/mess-menu
router.get("/", getMessMenu);

// PUT /api/mess-menu (admin only)
router.put("/", updateMessMenu);

module.exports = router;
