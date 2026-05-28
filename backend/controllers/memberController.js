const Member = require("../models/Member");


// ========================
// GET MEMBERS
// ========================
const getMembers = async (req, res) => {
  try {

    let members;

    // ADMIN SEES ALL
    if (req.branch.role === "admin") {

      members = await Member.find()
        .populate("branch", "branchName");

    } else {

      // BRANCH SEES ONLY THEIR MEMBERS
      members = await Member.find({
        branch: req.branch._id,
      });

    }

    res.json(members);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};



// ========================
// CREATE MEMBER
// ========================
const createMember = async (req, res) => {
  try {

    const {
      firstName,
      lastName,
      gender,
      phone,
      email,
    } = req.body;

    const member = await Member.create({
      firstName,
      lastName,
      gender,
      phone,
      email,

      // IMPORTANT
      branch: req.branch._id,
    });

    res.status(201).json(member);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to create member",
    });
  }
};



// ========================
// DELETE MEMBER
// ========================
const deleteMember = async (req, res) => {
  try {

    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    // ONLY OWNER OR ADMIN
    if (
      req.branch.role !== "admin" &&
      member.branch.toString() !== req.branch._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await member.deleteOne();

    res.json({
      message: "Member deleted",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getMembers,
  createMember,
  deleteMember,
};