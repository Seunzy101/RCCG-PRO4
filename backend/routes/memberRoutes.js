const express = require("express");

const router = express.Router();

const {
  getMembers,
  createMember,
  deleteMember,
} = require("../controllers/memberController");

const {
  protect,
} = require("../middleware/authMiddleware");



// ========================
// GET + CREATE MEMBERS
// ========================
router
  .route("/")
  .get(protect, getMembers)
  .post(protect, createMember);



// ========================
// DELETE MEMBER
// ========================
router
  .route("/:id")
  .delete(protect, deleteMember);



module.exports = router;