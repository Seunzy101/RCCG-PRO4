const jwt = require("jsonwebtoken");
const Branch = require("../models/Branch");

// ========================
// PROTECT ROUTE
// ========================
const protect = async (req, res, next) => {
  try {
    let token;

    // CHECK AUTH HEADER
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // VERIFY TOKEN
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      console.log("Decoded Token:", decoded);

      // FIND BRANCH
      const branch = await Branch.findById(decoded.id)
        .select("-password");

      console.log("Branch Found:", branch);

      if (!branch) {
        return res.status(401).json({
          message: "Branch not found",
        });
      }

      // ATTACH USER TO REQUEST
      req.branch = branch;

      next();
    } else {
      return res.status(401).json({
        message: "No token provided",
      });
    }
  } catch (error) {
    console.log("AUTH ERROR:", error);

    return res.status(401).json({
      message: "Not authorized",
    });
  }
};

module.exports = {
  protect,
};