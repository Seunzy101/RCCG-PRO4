const express = require("express");

const router = express.Router();

const {
  getBranches,
  createBranch,
  deleteBranch,
} = require("../controllers/branchController");

const {
  protect,
} = require("../middleware/authMiddleware");



// GET + CREATE
router
  .route("/")
  .get(protect, getBranches)
  .post(protect, createBranch);



// DELETE
router
  .route("/:id")
  .delete(protect, deleteBranch);



module.exports = router;