const Branch = require("../models/Branch");



// ========================
// GET ALL BRANCHES
// ========================
const getBranches = async (req, res) => {

  try {

    // ADMIN ONLY
    if (req.branch.role !== "admin") {

      return res.status(403).json({
        message: "Access denied",
      });
    }

    const branches = await Branch
      .find()
      .select("-password");

    res.json(branches);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};



// ========================
// CREATE BRANCH
// ========================
const createBranch = async (req, res) => {

  try {

    // ADMIN ONLY
    if (req.branch.role !== "admin") {

      return res.status(403).json({
        message: "Access denied",
      });
    }

    const {
      branchName,
      username,
      password,
      location,
      pastor,
    } = req.body;



    // CHECK EXISTING USERNAME
    const existingBranch = await Branch.findOne({
      username: username.toLowerCase(),
    });

    if (existingBranch) {

      return res.status(400).json({
        message: "Username already exists",
      });
    }



    // CREATE BRANCH
    const branch = await Branch.create({
      branchName,
      username,
      password,
      location,
      pastor,
      role: "branch",
    });



    res.status(201).json(branch);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};



// ========================
// DELETE BRANCH
// ========================
const deleteBranch = async (req, res) => {

  try {

    // ADMIN ONLY
    if (req.branch.role !== "admin") {

      return res.status(403).json({
        message: "Access denied",
      });
    }

    await Branch.findByIdAndDelete(req.params.id);

    res.json({
      message: "Branch deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};



module.exports = {
  getBranches,
  createBranch,
  deleteBranch,
};