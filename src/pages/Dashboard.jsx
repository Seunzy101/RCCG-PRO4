import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AttendanceChart from "../components/AttendanceChart";

const Dashboard = () => {
  const navigate = useNavigate();

  const branch = JSON.parse(localStorage.getItem("branchInfo"));

  const [stats, setStats] = useState({
    totalBranches: 0,
    totalMembers: 0,
    attendanceRecords: 0,
    latestAttendance: null,
    attendanceHistory: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!branch?.token) {
      navigate("/login");
      return;
    }

    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get(
        "https://rccg-pro4.onrender.com/api/dashboard",
        {
          headers: {
            Authorization: `Bearer ${branch.token}`,
          },
        }
      );

      setStats(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("branchInfo");
    navigate("/login");
  };
const latestPresent = stats.latestAttendance?.totalPresent || 0;

const latestAbsent = stats.latestAttendance?.totalAbsent || 0;

const attendanceRate =
  stats.totalMembers > 0
    ? Math.round((latestPresent / stats.totalMembers) * 100)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-bold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-blue-950">
            Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Welcome, {branch.branchName}
          </p>

          <p className="text-sm text-gray-500">
            Role: {branch.role}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl"
        >
          Logout
        </button>

      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">
            Total Members
          </p>

          <h1 className="text-5xl font-bold text-blue-950 mt-2">
            {stats.totalMembers}
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">
            Attendance Records
          </p>

          <h1 className="text-5xl font-bold text-green-600 mt-2">
            {stats.attendanceRecords}
          </h1>
        </div>

        {branch.role === "admin" && (
          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">
              Total Branches
            </p>

            <h1 className="text-5xl font-bold text-yellow-500 mt-2">
              {stats.totalBranches}
            </h1>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">
            Latest Attendance
          </p>

          <h2 className="text-xl font-bold mt-3">
            {stats.latestAttendance
              ? new Date(
                stats.latestAttendance.date
              ).toLocaleDateString()
              : "No Record"}
          </h2>
        </div>

      </div>

      {/* CHART */}
      <div className="mb-8">
        <AttendanceChart
          attendance={stats.attendanceHistory}
        />
      </div>
      {/* RECENT ATTENDANCE */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold text-blue-950">
            Recent Attendance
          </h2>

          <Link
            to="/reports"
            className="text-blue-700 font-semibold hover:underline"
          >
            View All
          </Link>

        </div>

        {stats.attendanceHistory.length === 0 ? (

          <p className="text-gray-500">
            No attendance records available.
          </p>

        ) : (

          <table className="w-full">

            <thead className="border-b">

              <tr>

                <th className="text-left py-3">
                  Date
                </th>

                {branch.role === "admin" && (
                  <th className="text-left py-3">
                    Branch
                  </th>
                )}

                <th className="text-left py-3">
                  Present
                </th>

                <th className="text-left py-3">
                  Absent
                </th>

              </tr>

            </thead>

            <tbody>

              {stats.attendanceHistory
                .slice(-5)
                .reverse()
                .map((record) => (

                  <tr
                    key={record._id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="py-4">
                      {new Date(record.date).toLocaleDateString()}
                    </td>

                    {branch.role === "admin" && (
                      <td className="py-4">
                        {record.branch?.branchName || "-"}
                      </td>
                    )}

                    <td className="py-4 text-green-600 font-semibold">
                      {record.totalPresent}
                    </td>

                    <td className="py-4 text-red-600 font-semibold">
                      {record.totalAbsent}
                    </td>

                  </tr>

                ))}

            </tbody>

          </table>

        )}

      </div>
      {/* TODAY'S SUMMARY */}
<div className="grid md:grid-cols-3 gap-6 mb-8">

  <div className="bg-green-600 text-white rounded-2xl p-6 shadow">

    <p className="text-lg">
      Present Today
    </p>

    <h1 className="text-5xl font-bold mt-3">
      {latestPresent}
    </h1>

  </div>

  <div className="bg-red-600 text-white rounded-2xl p-6 shadow">

    <p className="text-lg">
      Absent Today
    </p>

    <h1 className="text-5xl font-bold mt-3">
      {latestAbsent}
    </h1>

  </div>

  <div className="bg-blue-950 text-white rounded-2xl p-6 shadow">

    <p className="text-lg">
      Attendance Rate
    </p>

    <h1 className="text-5xl font-bold mt-3">
      {attendanceRate}%
    </h1>

  </div>

</div>
      {/* QUICK ACTIONS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <Link
          to="/members"
          className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-bold text-blue-950">
            Members
          </h2>

          <p className="mt-2 text-gray-500">
            Manage church members
          </p>
        </Link>

        <Link
          to="/attendance"
          className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-bold text-blue-950">
            Attendance
          </h2>

          <p className="mt-2 text-gray-500">
            Record attendance
          </p>
        </Link>

        <Link
          to="/reports"
          className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-bold text-blue-950">
            Reports
          </h2>

          <p className="mt-2 text-gray-500">
            Church analytics
          </p>
        </Link>

        {branch.role === "admin" && (
          <Link
            to="/branches"
            className="bg-yellow-500 rounded-2xl shadow p-6 hover:bg-yellow-400 transition"
          >
            <h2 className="text-2xl font-bold">
              Branches
            </h2>

            <p className="mt-2">
              Manage branches
            </p>
          </Link>
        )}

      </div>

    </section>
  );
};

export default Dashboard;