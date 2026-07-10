import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaClipboardCheck,
  FaChartLine,
  FaChurch,
} from "react-icons/fa";
import axios from "axios";

const Reports = () => {

  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  const branchInfo = JSON.parse(localStorage.getItem("branchInfo"));

  const config = {
    headers: {
      Authorization: `Bearer ${branchInfo?.token}`,
    },
  };


  // FETCH ALL DATA
  useEffect(() => {
    if (!branchInfo) {
      navigate("/login");
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [membersRes, attendanceRes] = await Promise.all([
        axios.get("https://rccg-pro4.onrender.com/api/members", config),
        axios.get("https://rccg-pro4.onrender.com/api/attendance", config),
      ]);

      setMembers(membersRes.data);
      setAttendance(attendanceRes.data);

      // Only admin can fetch branches
      if (branchInfo?.role === "admin") {
        const branchesRes = await axios.get(
          "https://rccg-pro4.onrender.com/api/auth/branches",
          config
        );
        setBranches(branchesRes.data);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  // LOGOUT
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };


  // STATS
  const totalMembers = members.length;
  const totalBranches = branches.length;
  const lastAttendance = attendance[0]; // most recent
  const lastPresent = lastAttendance?.totalPresent || 0;
  const attendancePercentage = totalMembers > 0
    ? Math.round((lastPresent / totalMembers) * 100)
    : 0;


  return (
    <section className="min-h-screen bg-gray-100 p-4 md:p-8">

      {/* NAVIGATION */}
      <div className="bg-white p-4 rounded-2xl shadow mb-8 flex flex-wrap gap-3 justify-between items-center">
        <div className="flex flex-wrap gap-3">
          <Link to="/" className="bg-blue-950 text-white px-5 py-2 rounded-lg hover:bg-blue-900 transition">Home</Link>
          <Link to="/dashboard" className="bg-yellow-500 text-black px-5 py-2 rounded-lg hover:bg-yellow-400 transition">Dashboard</Link>
          <Link to="/members" className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-500 transition">Members</Link>
          <Link to="/attendance" className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-500 transition">Attendance</Link>
          {branchInfo?.role === "admin" && (
            <Link to="/branches" className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-500 transition">Branches</Link>
          )}
        </div>
        <button onClick={handleLogout} className="bg-red-600 hover:bg-red-500 transition text-white px-5 py-2 rounded-lg">
          Logout
        </button>
      </div>


      {/* PAGE TITLE */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-950">
          Reports & Analytics
        </h1>
        <p className="text-gray-500 mt-2">
          Overview of church growth and attendance performance
        </p>
      </div>


      {loading ? (
        <div className="text-center py-20 text-gray-500 text-xl">
          Loading reports...
        </div>
      ) : (
        <>
          {/* REPORT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

            {/* TOTAL MEMBERS */}
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Total Members</p>
                  <h2 className="text-4xl font-bold mt-2 text-blue-950">{totalMembers}</h2>
                </div>
                <FaUsers className="text-5xl text-blue-950" />
              </div>
            </div>

            {/* LAST SUNDAY ATTENDANCE */}
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Last Sunday</p>
                  <h2 className="text-4xl font-bold mt-2 text-green-600">{lastPresent}</h2>
                </div>
                <FaClipboardCheck className="text-5xl text-green-600" />
              </div>
            </div>

            {/* ATTENDANCE RATE */}
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Attendance Rate</p>
                  <h2 className="text-4xl font-bold mt-2 text-yellow-500">{attendancePercentage}%</h2>
                </div>
                <FaChartLine className="text-5xl text-yellow-500" />
              </div>
            </div>

            {/* TOTAL BRANCHES (admin only) */}
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Total Branches</p>
                  <h2 className="text-4xl font-bold mt-2 text-purple-600">
                    {branchInfo?.role === "admin" ? totalBranches : "—"}
                  </h2>
                </div>
                <FaChurch className="text-5xl text-purple-600" />
              </div>
            </div>

          </div>


          {/* MAIN CONTENT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* ATTENDANCE HISTORY TABLE */}
            <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
              <h2 className="text-2xl font-bold text-blue-950 mb-6">
                Attendance History
              </h2>

              {attendance.length === 0 ? (
                <p className="text-gray-500 text-center py-6">No attendance records yet</p>
              ) : (
                <table className="w-full min-w-[400px]">
                  <thead className="bg-blue-950 text-white">
                    <tr>
                      <th className="text-left py-4 px-6">Date</th>
                      <th className="text-left py-4 px-6">Branch</th>
                      <th className="text-left py-4 px-6">Present</th>
                      <th className="text-left py-4 px-6">Absent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendance.map((record) => (
                      <tr
                        key={record._id}
                        onClick={() => navigate(`/attendance/${record._id}`)}
                        className="border-b hover:bg-blue-50 cursor-pointer transition"
                      >
                        <td className="py-4 px-6">
                          {new Date(record.date).toLocaleDateString()}
                        </td>

                        <td className="py-4 px-6">
                          {record.branch?.branchName || "Unknown Branch"}
                        </td>

                        <td className="py-4 px-6 text-green-600 font-semibold">
                          {record.totalPresent}
                        </td>

                        <td className="py-4 px-6 text-red-500 font-semibold">
                          {record.totalAbsent}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>


            {/* ANALYTICS */}
            <div className="space-y-8">

              {/* ATTENDANCE PERFORMANCE */}
              <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-2xl font-bold text-blue-950 mb-6">
                  Attendance Performance
                </h2>

                {attendance.length === 0 ? (
                  <p className="text-gray-500 text-center py-6">No data yet</p>
                ) : (
                  <div className="space-y-5">
                    {attendance.slice(0, 4).map((record) => {
                      const percent = totalMembers > 0
                        ? Math.round((record.totalPresent / totalMembers) * 100)
                        : 0;
                      return (
                        <div key={record._id}>
                          <div className="flex justify-between mb-2">
                            <span className="font-medium">
                              {new Date(record.date).toLocaleDateString()}
                            </span>
                            <span>{percent}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                              className="bg-green-600 h-4 rounded-full transition-all"
                              style={{ width: `${percent}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>


              {/* RECENT ACTIVITIES */}
              <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-2xl font-bold text-blue-950 mb-6">
                  Recent Activities
                </h2>

                <div className="space-y-4">
                  {attendance.slice(0, 3).map((record) => (
                    <div key={record._id} className="border-l-4 border-green-600 pl-4">
                      <p className="font-semibold">
                        Sunday attendance — {record.totalPresent} present
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(record.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}

                  {attendance.length === 0 && (
                    <p className="text-gray-500">No recent activities</p>
                  )}
                </div>
              </div>

            </div>
          </div>
        </>
      )}

    </section>
  );
};

export default Reports;
