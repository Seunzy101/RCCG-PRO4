const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();


// ========================
// ROUTES IMPORT
// ========================
const authRoutes = require("./routes/authRoutes");

const memberRoutes = require("./routes/memberRoutes");

const attendanceRoutes = require("./routes/attendanceRoutes");

const branchRoutes = require("./routes/branchRoutes");



// ========================
// MIDDLEWARE
// ========================
app.use(cors());

app.use(express.json());



// ========================
// API ROUTES
// ========================
app.use("/api/auth", authRoutes);

app.use("/api/members", memberRoutes);

app.use("/api/attendance", attendanceRoutes);

app.use("/api/branches", branchRoutes);



// ========================
// TEST ROUTE
// ========================
app.get("/", (req, res) => {

  res.send("RCCG Province 4 Backend Running...");
});



// ========================
// CONNECT DATABASE
// ========================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log("MongoDB Connected");

  })
  .catch((error) => {

    console.log(error);
  });



// ========================
// SERVER
// ========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);
});