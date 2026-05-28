const markAttendance = async (req, res) => {
  try {

    res.status(201).json({
      message: "Attendance marked successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};



const getAttendance = async (req, res) => {
  try {

    res.json([]);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};



module.exports = {
  markAttendance,
  getAttendance,
};