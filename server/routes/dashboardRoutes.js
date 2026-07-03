const express = require("express");
const router = express.Router();

const {
  adminDashboard,
  residentDashboard,
} = require("../controllers/dashboardController");

const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// ======================
// Admin Dashboard
// ======================
router.get(
  "/admin",
  isAuthenticated,
  authorizeRoles("admin"),
  adminDashboard
);

// ======================
// Resident Dashboard
// ======================
router.get(
  "/resident",
  isAuthenticated,
  authorizeRoles("resident"),
  residentDashboard
);

module.exports = router;