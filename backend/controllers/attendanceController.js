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

    // prevent duplicate attendance for same branch same date
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
// GET ATTENDANCE
// ===============================
const getAttendance = async (req, res) => {
  try {
    let attendance;

    // ADMIN SEES EVERYTHING
    if (req.branch.role === "admin") {
      attendance = await Attendance.find()
        .populate("branch", "branchName")
        .sort({ date: -1 });
    }

    // BRANCH SEES ONLY ITS RECORDS
    else {
      attendance = await Attendance.find({
        branch: req.branch._id,
      })
        .populate("branch", "branchName")
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

module.exports = {
  markAttendance,
  getAttendance,
};