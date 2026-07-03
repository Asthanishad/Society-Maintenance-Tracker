const Complaint = require("../models/Complaint");

// Create Complaint
exports.createComplaint = async (req, res) => {
  try {
    const { title, description } = req.body;

    const complaint = await Complaint.create({
      resident: req.user._id,
      title,
      description,
      image: req.file ? req.file.path : "",
      history: [
        {
          status: "Pending",
          note: "Complaint Created",
          actor: req.user._id,
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: "Complaint Created Successfully",
      complaint,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Resident -> Get My Complaints
exports.getMyComplaints = async (req, res) => {
  try {

    const complaints = await Complaint.find({
      resident: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      complaints,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin -> Get All Complaints
exports.getAllComplaints = async (req, res) => {
  try {

    const complaints = await Complaint.find()
      .populate("resident", "name email flatNumber")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      complaints,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin -> Update Complaint Status
exports.updateComplaintStatus = async (req, res) => {
  try {

    const { status, note } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    complaint.status = status;

    complaint.history.push({
      status,
      note,
      actor: req.user._id,
    });

    await complaint.save();

    res.status(200).json({
      success: true,
      message: "Complaint Updated Successfully",
      complaint,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin -> Delete Complaint
exports.deleteComplaint = async (req, res) => {
  try {

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    await Complaint.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Complaint Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};