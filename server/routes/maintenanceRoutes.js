const express = require("express");
const router = express.Router();

const {
  createMaintenance,
  getAllMaintenance,
  getMyMaintenance,
  payMaintenance,
  deleteMaintenance,
} = require("../controllers/maintenanceController");

const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// =======================
// Admin Routes
// =======================

// Create Maintenance Bill
router.post(
  "/create",
  isAuthenticated,
  authorizeRoles("admin"),
  createMaintenance
);

// Get All Maintenance Bills
router.get(
  "/all",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllMaintenance
);

// Delete Maintenance Bill
router.delete(
  "/delete/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteMaintenance
);

// =======================
// Resident Routes
// =======================

// Get My Maintenance Bills
router.get(
  "/my",
  isAuthenticated,
  getMyMaintenance
);

// Pay Maintenance Bill
router.put(
  "/pay/:id",
  isAuthenticated,
  payMaintenance
);

module.exports = router;