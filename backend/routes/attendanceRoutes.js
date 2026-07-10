const express = require("express");
const router = express.Router();

const {
  markAttendance,
  getAttendance,
  getAttendanceById,
} = require("../controllers/attendanceController");

const { protect } = require("../middleware/authMiddleware");

// GET ALL ATTENDANCE
router.get("/", protect, getAttendance);

// GET SINGLE ATTENDANCE RECORD
router.get("/:id", protect, getAttendanceById);

// MARK ATTENDANCE
router.post("/", protect, markAttendance);

module.exports = router;