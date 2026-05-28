import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {

  const navigate = useNavigate();

  // GET USER INFO
  const branch = JSON.parse(
    localStorage.getItem("branchInfo")
  );



  // PROTECT PAGE
  useEffect(() => {

    if (!branch || !branch.token) {
      navigate("/login");
    }

  }, [branch, navigate]);



  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("branchInfo");

    navigate("/login");
  };



  return (

    <section className="min-h-screen bg-gray-100 p-6 md:p-10">

      {/* TOP */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-10">

        <div>

          <h1 className="text-3xl font-bold text-blue-950">
            Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Welcome, {branch?.branchName || "Branch"}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Role: {branch?.role}
          </p>

        </div>



        {/* BUTTONS */}
        <div className="flex gap-3 flex-wrap">

          <Link
            to="/"
            className="bg-blue-950 hover:bg-blue-900 transition text-white px-6 py-3 rounded-lg font-semibold"
          >
            Home
          </Link>



          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-500 transition text-white px-6 py-3 rounded-lg font-semibold"
          >
            Logout
          </button>

        </div>

      </div>



      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* MEMBERS */}
        <Link
          to="/members"
          className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition"
        >

          <h2 className="text-2xl font-bold text-blue-950 mb-2">
            Members
          </h2>

          <p className="text-gray-500">
            Manage church members
          </p>

        </Link>



        {/* ATTENDANCE */}
        <Link
          to="/attendance"
          className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition"
        >

          <h2 className="text-2xl font-bold text-blue-950 mb-2">
            Attendance
          </h2>

          <p className="text-gray-500">
            Record attendance
          </p>

        </Link>



        {/* REPORTS */}
        <Link
          to="/reports"
          className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition"
        >

          <h2 className="text-2xl font-bold text-blue-950 mb-2">
            Reports
          </h2>

          <p className="text-gray-500">
            View reports and analytics
          </p>

        </Link>



        {/* ADMIN ONLY */}
        {branch?.role === "admin" && (

          <Link
            to="/branches"
            className="bg-yellow-500 hover:bg-yellow-400 transition p-6 rounded-2xl font-semibold text-black shadow hover:shadow-xl"
          >

            <h2 className="text-2xl font-bold mb-2">
              Branches
            </h2>

            <p>
              Create and manage branches
            </p>

          </Link>

        )}

      </div>

    </section>
  );
};

export default Dashboard;