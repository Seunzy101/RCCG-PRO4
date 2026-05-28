const express = require("express");

const router = express.Router();

const {
  markAttendance,
  getAttendance,
} = require("../controllers/attendanceController");


// GET ATTENDANCE
router.get("/", getAttendance);


// MARK ATTENDANCE
router.post("/", markAttendance);


module.exports = router;