const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
    },
    records: [
      {
        member: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Member",
          required: true,
        },
        present: {
          type: Boolean,
          default: false,
        },
      },
    ],
    totalPresent: {
      type: Number,
      default: 0,
    },
    totalAbsent: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);