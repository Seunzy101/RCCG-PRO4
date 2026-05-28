import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Attendance = () => {

  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const branchInfo = JSON.parse(localStorage.getItem("branchInfo"));

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${branchInfo?.token}`,
    },
  };

  // TODAY DATE
  const today = new Date().toLocaleDateString();
  const todayISO = new Date().toISOString().split("T")[0];


  // FETCH MEMBERS FROM BACKEND
  const fetchMembers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/members",
        config
      );

      // Add present field to each member
      const withAttendance = data.map((member) => ({
        ...member,
        present: false,
      }));

      setMembers(withAttendance);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (!branchInfo) {
      navigate("/login");
    } else {
      fetchMembers();
    }
  }, []);


  // TOGGLE ATTENDANCE
  const toggleAttendance = (id) => {
    setMembers(members.map((member) =>
      member._id === id
        ? { ...member, present: !member.present }
        : member
    ));
  };


  // MARK ALL PRESENT
  const markAllPresent = () => {
    setMembers(members.map((member) => ({ ...member, present: true })));
  };


  // RESET ATTENDANCE
  const resetAttendance = () => {
    setMembers(members.map((member) => ({ ...member, present: false })));
  };


  // SUBMIT ATTENDANCE TO BACKEND
  const submitAttendance = async () => {
    setSubmitting(true);
    setMessage("");
    setError("");

    try {
      const records = members.map((member) => ({
        member: member._id,
        present: member.present,
      }));

      await axios.post(
        "http://localhost:5000/api/attendance",
        { date: todayISO, records },
        config
      );

      setMessage("Attendance submitted successfully!");

    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to submit attendance"
      );
    } finally {
      setSubmitting(false);
    }
  };


  // LOGOUT
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };


  // FILTER MEMBERS
  const filteredMembers = members.filter((member) =>
    `${member.firstName} ${member.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalPresent = members.filter((m) => m.present).length;
  const totalAbsent = members.length - totalPresent;
  const attendancePercentage = members.length > 0
    ? Math.round((totalPresent / members.length) * 100)
    : 0;


  return (
    <section className="min-h-screen bg-gray-100 p-4 md:p-8">

      {/* NAVIGATION */}
      <div className="bg-white p-4 rounded-2xl shadow mb-8 flex flex-wrap gap-3 justify-between items-center">
        <div className="flex flex-wrap gap-3">
          <Link to="/" className="bg-blue-950 text-white px-5 py-2 rounded-lg hover:bg-blue-900 transition">Home</Link>
          <Link to="/dashboard" className="bg-yellow-500 text-black px-5 py-2 rounded-lg hover:bg-yellow-400 transition">Dashboard</Link>
          <Link to="/members" className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-500 transition">Members</Link>
          <Link to="/reports" className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-500 transition">Reports</Link>
        </div>
        <button onClick={handleLogout} className="bg-red-600 hover:bg-red-500 transition text-white px-5 py-2 rounded-lg">
          Logout
        </button>
      </div>


      {/* TOP */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-950">
            Attendance Management
          </h1>
          <p className="text-gray-500 mt-2">Mark Sunday service attendance</p>
          <p className="text-sm text-gray-400 mt-1">{today}</p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-green-600 text-white px-6 py-5 rounded-2xl shadow">
            <p className="text-sm opacity-80">Present</p>
            <h2 className="text-3xl font-bold">{totalPresent}</h2>
          </div>
          <div className="bg-red-600 text-white px-6 py-5 rounded-2xl shadow">
            <p className="text-sm opacity-80">Absent</p>
            <h2 className="text-3xl font-bold">{totalAbsent}</h2>
          </div>
          <div className="bg-yellow-500 text-black px-6 py-5 rounded-2xl shadow">
            <p className="text-sm opacity-80">Attendance</p>
            <h2 className="text-3xl font-bold">{attendancePercentage}%</h2>
          </div>
        </div>
      </div>


      {/* SUCCESS / ERROR */}
      {message && (
        <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg mb-6">
          {message}
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}


      {/* ACTIONS */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search member..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-900"
        />
        <div className="flex gap-3">
          <button onClick={markAllPresent} className="bg-green-600 hover:bg-green-500 transition text-white px-5 py-3 rounded-xl">
            Mark All Present
          </button>
          <button onClick={resetAttendance} className="bg-red-600 hover:bg-red-500 transition text-white px-5 py-3 rounded-xl">
            Reset
          </button>
        </div>
      </div>


      {/* TABLE */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">
          Loading members...
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow overflow-x-auto">
          {filteredMembers.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No members found
            </div>
          ) : (
            <table className="w-full min-w-[700px]">
              <thead className="bg-blue-950 text-white">
                <tr>
                  <th className="text-left py-4 px-6">Member Name</th>
                  <th className="text-left py-4 px-6">Status</th>
                  <th className="text-left py-4 px-6">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member._id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-4 px-6 font-medium">
                      {member.firstName} {member.lastName}
                    </td>
                    <td className="py-4 px-6">
                      {member.present ? (
                        <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium">Present</span>
                      ) : (
                        <span className="bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-medium">Absent</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => toggleAttendance(member._id)}
                        className={`px-5 py-2 rounded-lg font-medium transition ${
                          member.present
                            ? "bg-red-500 hover:bg-red-400 text-white"
                            : "bg-green-600 hover:bg-green-500 text-white"
                        }`}
                      >
                        {member.present ? "Mark Absent" : "Mark Present"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}


      {/* SUBMIT BUTTON */}
      {members.length > 0 && (
        <div className="mt-8">
          <button
            onClick={submitAttendance}
            disabled={submitting}
            className={`w-full py-4 rounded-2xl font-bold text-lg transition ${
              submitting
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-blue-950 hover:bg-blue-900 text-white"
            }`}
          >
            {submitting ? "Submitting..." : "Submit Attendance"}
          </button>
        </div>
      )}

    </section>
  );
};

export default Attendance;