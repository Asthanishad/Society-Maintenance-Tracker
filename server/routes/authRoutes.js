const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getProfile,
  getResidents,
} = require("../controllers/authController");

const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Logged In User
router.get(
  "/me",
  isAuthenticated,
  getProfile
);

// Get All Residents (Admin Only)
router.get(
  "/residents",
  isAuthenticated,
  authorizeRoles("admin"),
  getResidents
);

module.exports = router;