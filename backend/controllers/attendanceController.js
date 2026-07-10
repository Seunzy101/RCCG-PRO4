const Attendance = require("../models/Attendance");

// ===============================
// MARK ATTENDANCE
// ===============================
const markAttendance = async (req, res) => {
  try {
    const { date, records } = req.body;

    if (!date || !records) {
      return res.status(400).json({
        message: "Attendance data is required",
      });
    }

    const totalPresent = records.filter(
      (record) => record.present
    ).length;

    const totalAbsent = records.length - totalPresent;

    // Prevent duplicate attendance for same branch and date
    const existingAttendance = await Attendance.findOne({
      branch: req.branch._id,
      date,
    });

    if (existingAttendance) {
      return res.status(400).json({
        message: "Attendance already submitted for this date",
      });
    }

    const attendance = await Attendance.create({
      branch: req.branch._id,
      date,
      records,
      totalPresent,
      totalAbsent,
    });

    res.status(201).json(attendance);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ===============================
// GET ALL ATTENDANCE
// ===============================
const getAttendance = async (req, res) => {
  try {
    let attendance;

    // ADMIN SEES EVERYTHING
    if (req.branch.role === "admin") {
      attendance = await Attendance.find()
        .populate("branch", "branchName pastor location")
        .populate(
          "records.member",
          "firstName lastName gender phone email"
        )
        .sort({ date: -1 });
    }

    // BRANCH SEES ONLY ITS RECORDS
    else {
      attendance = await Attendance.find({
        branch: req.branch._id,
      })
        .populate("branch", "branchName pastor location")
        .populate(
          "records.member",
          "firstName lastName gender phone email"
        )
        .sort({ date: -1 });
    }

    res.json(attendance);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ===============================
// GET SINGLE ATTENDANCE
// ===============================
const getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id)
      .populate("branch", "branchName pastor location")
      .populate(
        "records.member",
        "firstName lastName gender phone email"
      );

    if (!attendance) {
      return res.status(404).json({
        message: "Attendance record not found",
      });
    }

    // Branch users can only view their own attendance
    if (
      req.branch.role !== "admin" &&
      attendance.branch._id.toString() !== req.branch._id.toString()
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    res.json(attendance);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  markAttendance,
  getAttendance,
  getAttendanceById,
};