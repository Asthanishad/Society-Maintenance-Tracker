const express = require("express");
const router = express.Router();

const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus,
  deleteComplaint,
} = require("../controllers/complaintController");

const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const upload = require("../middleware/upload");

// Resident
router.post(
  "/create",
  isAuthenticated,
  upload.single("image"),
  createComplaint
);

router.get(
  "/my",
  isAuthenticated,
  getMyComplaints
);

// Admin
router.get(
  "/all",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllComplaints
);

router.put(
  "/status/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateComplaintStatus
);

router.delete(
  "/delete/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteComplaint
);

module.exports = router;