const express = require("express");
const router = express.Router();

const {
  createNotice,
  getAllNotices,
  getPinnedNotices,
  pinNotice,
  unpinNotice,
  deleteNotice,
} = require("../controllers/noticeController");

const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// Create Notice
router.post(
  "/create",
  isAuthenticated,
  authorizeRoles("admin"),
  createNotice
);

// Get All Notices
router.get(
  "/all",
  isAuthenticated,
  getAllNotices
);

// Get Pinned Notices
router.get(
  "/pinned",
  isAuthenticated,
  getPinnedNotices
);

// Pin Notice
router.put(
  "/pin/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  pinNotice
);

// Unpin Notice
router.put(
  "/unpin/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  unpinNotice
);

// Delete Notice
router.delete(
  "/delete/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteNotice
);

module.exports = router;