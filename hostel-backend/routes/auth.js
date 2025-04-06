const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  registerAdmin,
  loginAdmin,
} = require("../controllers/authController");

// POST /api/auth/register
router.post("/register", registerUser);

// POST /api/auth/login (for regular users)
router.post("/login", loginUser);

// POST /api/auth/admin/login (for admin login)
router.post("/admin/login", loginAdmin);
// POST /api/auth/admin/register for admin registration
router.post("/admin/register", registerAdmin);

module.exports = router;
