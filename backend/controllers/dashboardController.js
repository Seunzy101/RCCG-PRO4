const Branch = require("../models/Branch");
const Member = require("../models/Member");
const Attendance = require("../models/Attendance");

const getDashboardStats = async (req, res) => {
    try {
        let totalBranches = 0;
        let totalMembers = 0;
        let attendanceRecords = 0;
        let latestAttendance = null;

        // ==========================
        // ADMIN DASHBOARD
        // ==========================
        if (req.branch.role === "admin") {
            totalBranches = await Branch.countDocuments({
                role: "branch",
            });

            totalMembers = await Member.countDocuments();

            attendanceRecords = await Attendance.countDocuments();

            latestAttendance = await Attendance.findOne()
                .sort({ date: -1 });
        }


        // ==========================
        // BRANCH DASHBOARD
        // ==========================
        else {
            totalMembers = await Member.countDocuments({
                branch: req.branch._id,
            });

            attendanceRecords = await Attendance.countDocuments({
                branch: req.branch._id,
            });

            latestAttendance = await Attendance.findOne({
                branch: req.branch._id,
            }).sort({ date: -1 });
        }

        let attendanceHistory = [];

        // ADMIN
        if (req.branch.role === "admin") {
            attendanceHistory = await Attendance.find()
                .populate("branch", "branchName")
                .sort({ date: 1 });
        }

        // BRANCH
        else {
            attendanceHistory = await Attendance.find({
                branch: req.branch._id,
            })
                .populate("branch", "branchName")
                .sort({ date: 1 });
        }

        res.json({
            totalBranches,
            totalMembers,
            attendanceRecords,
            latestAttendance,
            attendanceHistory,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = {
    getDashboardStats,
};