const User = require("../models/User");
const Complaint = require("../models/Complaint");
const Maintenance = require("../models/Maintenance");
const Notice = require("../models/Notice");

// =========================
// Admin Dashboard
// =========================
exports.adminDashboard = async (req, res) => {
  try {
    const totalResidents = await User.countDocuments({
      role: "resident",
    });

    const totalComplaints = await Complaint.countDocuments();

    const pendingComplaints = await Complaint.countDocuments({
      status: "Pending",
    });

    const inProgressComplaints = await Complaint.countDocuments({
      status: "In Progress",
    });

    const resolvedComplaints = await Complaint.countDocuments({
      status: "Resolved",
    });

    const pendingMaintenance = await Maintenance.countDocuments({
      status: "Pending",
    });

    const overdueMaintenance = await Maintenance.countDocuments({
      status: "Overdue",
    });

    const paidMaintenance = await Maintenance.countDocuments({
      status: "Paid",
    });

    const paidBills = await Maintenance.find({
      status: "Paid",
    });

    let totalCollection = 0;

    paidBills.forEach((bill) => {
      totalCollection += bill.amount;
    });

    const recentComplaints = await Complaint.find()
      .populate("resident", "name flatNumber")
      .sort({ createdAt: -1 })
      .limit(5);

    const recentNotices = await Notice.find()
      .populate("createdBy", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      dashboard: {
        totalResidents,
        totalComplaints,
        pendingComplaints,
        inProgressComplaints,
        resolvedComplaints,
        pendingMaintenance,
        overdueMaintenance,
        paidMaintenance,
        totalCollection,
        recentComplaints,
        recentNotices,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Resident Dashboard
// =========================
exports.residentDashboard = async (req, res) => {
  try {

    const myComplaints = await Complaint.countDocuments({
      resident: req.user._id,
    });

    const pendingMaintenance = await Maintenance.countDocuments({
      resident: req.user._id,
      status: "Pending",
    });

    const overdueMaintenance = await Maintenance.countDocuments({
      resident: req.user._id,
      status: "Overdue",
    });

    const paidMaintenance = await Maintenance.countDocuments({
      resident: req.user._id,
      status: "Paid",
    });

    const latestNotices = await Notice.find()
      .sort({ isPinned: -1, createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      dashboard: {
        myComplaints,
        pendingMaintenance,
        overdueMaintenance,
        paidMaintenance,
        latestNotices,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};