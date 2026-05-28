const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const branchSchema = new mongoose.Schema(
  {
    branchName: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // hide password from normal queries
    },

    location: {
      type: String,
      trim: true,
    },

    pastor: {
      type: String,
      trim: true,
    },

    // ROLE SYSTEM
    role: {
      type: String,
      enum: ["admin", "branch"],
      default: "branch",
    },

    // ACTIVE STATUS
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);



// ====================================
// HASH PASSWORD BEFORE SAVING
// ====================================
branchSchema.pre("save", async function (next) {

  // only hash if password changed
  if (!this.isModified("password")) {
    return next();
  }

  try {

    // generate salt
    const salt = await bcrypt.genSalt(10);

    // hash password
    this.password = await bcrypt.hash(this.password, salt);

    next();

  } catch (error) {

    next(error);
  }
});



// ====================================
// MATCH PASSWORD
// ====================================
branchSchema.methods.matchPassword = async function (enteredPassword) {

  return await bcrypt.compare(
    enteredPassword,
    this.password
  );
};



// ====================================
// EXPORT MODEL
// ====================================
module.exports = mongoose.model(
  "Branch",
  branchSchema
);