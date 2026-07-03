const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// ======================
// Middlewares
// ======================
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// ======================
// Static Folder
// ======================
app.use("/uploads", express.static("uploads"));

// ======================
// API Routes
// ======================
app.use("/api/auth", authRoutes);

app.use("/api/notice", noticeRoutes);

app.use("/api/maintenance", maintenanceRoutes);

app.use("/api/complaint", complaintRoutes);

app.use("/api/dashboard", dashboardRoutes);

// ======================
// Health Check
// ======================
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Society Maintenance Tracker API is running 🚀",
  });
});


module.exports = app;