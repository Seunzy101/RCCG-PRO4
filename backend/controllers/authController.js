const Branch = require("../models/Branch");
const jwt = require("jsonwebtoken");


// GENERATE TOKEN
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};



// LOGIN
const login = async (req, res) => {

  try {

    const { username, password } = req.body;

    // VALIDATION
    if (!username || !password) {
      return res.status(400).json({
        message: "Please enter username and password",
      });
    }

    // FIND USER + PASSWORD
    const branch = await Branch.findOne({
      username: username.toLowerCase(),
    }).select("+password");



    // CHECK USER
    if (!branch) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }



    // CHECK PASSWORD
    const isMatch = await branch.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }



    // SUCCESS RESPONSE
    res.status(200).json({
      _id: branch._id,
      branchName: branch.branchName,
      username: branch.username,
      location: branch.location,
      pastor: branch.pastor,

      // IMPORTANT
      role: branch.role,

      token: generateToken(branch._id),
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};



module.exports = {
  login,
};