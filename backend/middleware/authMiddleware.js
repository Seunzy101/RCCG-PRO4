const jwt = require("jsonwebtoken");

const Branch = require("../models/Branch");



// ========================
// PROTECT ROUTE
// ========================
const protect = async (req, res, next) => {

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {

    try {

      token = req.headers.authorization.split(" ")[1];



      // VERIFY TOKEN
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );



      // GET USER
      req.branch = await Branch
        .findById(decoded.id)
        .select("-password");



      next();

    } catch (error) {

      console.log(error);

      res.status(401).json({
        message: "Not authorized",
      });
    }

  } else {

    res.status(401).json({
      message: "No token",
    });
  }
};



module.exports = {
  protect,
};