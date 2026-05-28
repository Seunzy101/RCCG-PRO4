require("dotenv").config();

const mongoose = require("mongoose");
const Branch = require("./models/Branch");


// CONNECT DATABASE
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });


// CREATE ADMIN
const createAdmin = async () => {

  try {

    const existingAdmin = await Branch.findOne({
      username: "admin",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const admin = await Branch.create({
      branchName: "RCCG Province 4 HQ",
      username: "admin",
      password: "123456",
      location: "Lagos",
      pastor: "Pastor E.A Adeboye",
      isAdmin: true,
    });

    console.log("Admin created successfully");
    console.log(admin);

    process.exit();

  } catch (error) {

    console.log(error);

    process.exit(1);

  }
};

createAdmin();