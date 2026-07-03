const Maintenance = require("../models/Maintenance");

// Create Maintenance Bill
exports.createMaintenance = async (req, res) => {
  try {
    const { resident, amount, month, dueDate } = req.body;

    if (!resident || !amount || !month || !dueDate) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const maintenance = await Maintenance.create({
      resident,
      amount,
      month,
      dueDate,
    });

    res.status(201).json({
      success: true,
      message: "Maintenance Bill Created Successfully",
      maintenance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Maintenance Bills
exports.getAllMaintenance = async (req, res) => {
  try {
    // Auto Overdue Detection
    await Maintenance.updateMany(
      {
        status: "Pending",
        dueDate: { $lt: new Date() },
      },
      {
        status: "Overdue",
      }
    );

    const maintenance = await Maintenance.find()
      .populate("resident", "name email flatNumber")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: maintenance.length,
      maintenance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Resident → Get My Bills
exports.getMyMaintenance = async (req, res) => {
  try {
    // Auto Overdue Detection
    await Maintenance.updateMany(
      {
        resident: req.user._id,
        status: "Pending",
        dueDate: { $lt: new Date() },
      },
      {
        status: "Overdue",
      }
    );

    const maintenance = await Maintenance.find({
      resident: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: maintenance.length,
      maintenance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Pay Maintenance
exports.payMaintenance = async (req, res) => {
  try {
    const maintenance = await Maintenance.findById(req.params.id);

    if (!maintenance) {
      return res.status(404).json({
        success: false,
        message: "Maintenance Bill not found",
      });
    }

    if (maintenance.status === "Paid") {
      return res.status(400).json({
        success: false,
        message: "Maintenance already paid",
      });
    }

    maintenance.status = "Paid";
    maintenance.paymentDate = new Date();

    await maintenance.save();

    res.status(200).json({
      success: true,
      message: "Maintenance Paid Successfully",
      maintenance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Maintenance
exports.deleteMaintenance = async (req, res) => {
  try {
    const maintenance = await Maintenance.findById(req.params.id);

    if (!maintenance) {
      return res.status(404).json({
        success: false,
        message: "Maintenance Bill not found",
      });
    }

    await Maintenance.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Maintenance Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};