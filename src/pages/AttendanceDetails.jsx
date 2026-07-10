import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

const AttendanceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(true);

  const branchInfo = JSON.parse(localStorage.getItem("branchInfo"));

  const config = {
    headers: {
      Authorization: `Bearer ${branchInfo?.token}`,
    },
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const { data } = await axios.get(
        "https://rccg-pro4.onrender.com/api/attendance",
        config
      );

      const record = data.find((item) => item._id === id);

      if (!record) {
        navigate("/reports");
        return;
      }

      setAttendance(record);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading attendance...
      </div>
    );
  }

  if (!attendance) {
    return (
      <div className="text-center py-20">
        Attendance not found
      </div>
    );
  }

  const total = attendance.records.length;
  const percentage =
    total > 0
      ? Math.round((attendance.totalPresent / total) * 100)
      : 0;

  return (
    <section className="min-h-screen bg-gray-100 p-6">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-blue-950">
          Attendance Details
        </h1>

        <Link
          to="/reports"
          className="bg-blue-950 text-white px-5 py-3 rounded-lg"
        >
          Back
        </Link>

      </div>

      {/* Summary */}

      <div className="grid md:grid-cols-4 gap-5 mb-8">

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Branch</p>
          <h2 className="text-2xl font-bold">
            {attendance.branch?.branchName}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Pastor</p>
          <h2 className="text-xl font-bold">
            {attendance.branch?.pastor}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Location</p>
          <h2 className="text-xl font-bold">
            {attendance.branch?.location}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Date</p>
          <h2 className="text-xl font-bold">
            {new Date(attendance.date).toLocaleDateString()}
          </h2>
        </div>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-5 mb-10">

        <div className="bg-green-600 text-white rounded-xl p-6 shadow">
          <p>Present</p>
          <h2 className="text-4xl font-bold">
            {attendance.totalPresent}
          </h2>
        </div>

        <div className="bg-red-600 text-white rounded-xl p-6 shadow">
          <p>Absent</p>
          <h2 className="text-4xl font-bold">
            {attendance.totalAbsent}
          </h2>
        </div>

        <div className="bg-yellow-500 text-black rounded-xl p-6 shadow">
          <p>Attendance Rate</p>
          <h2 className="text-4xl font-bold">
            {percentage}%
          </h2>
        </div>

      </div>

      {/* Members */}

      <div className="bg-white rounded-2xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-blue-950 text-white">

            <tr>

              <th className="px-5 py-4 text-left">Name</th>

              <th className="px-5 py-4 text-left">Gender</th>

              <th className="px-5 py-4 text-left">Phone</th>

              <th className="px-5 py-4 text-left">Email</th>

              <th className="px-5 py-4 text-left">Status</th>

            </tr>

          </thead>

          <tbody>

            {attendance.records.map((record) => (

              <tr
                key={record._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="px-5 py-4">

                  {record.member.firstName}{" "}
                  {record.member.lastName}

                </td>

                <td className="px-5 py-4">

                  {record.member.gender}

                </td>

                <td className="px-5 py-4">

                  {record.member.phone || "-"}

                </td>

                <td className="px-5 py-4">

                  {record.member.email || "-"}

                </td>

                <td className="px-5 py-4">

                  {record.present ? (

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      Present
                    </span>

                  ) : (

                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                      Absent
                    </span>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
};

export default AttendanceDetails;