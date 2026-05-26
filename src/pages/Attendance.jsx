import { useState } from "react";
import { Link } from "react-router-dom";

const Attendance = () => {

  // SAMPLE MEMBERS
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "John Doe",
      present: false,
    },

    {
      id: 2,
      name: "Mary Johnson",
      present: false,
    },

    {
      id: 3,
      name: "David Samuel",
      present: false,
    },

    {
      id: 4,
      name: "Grace Paul",
      present: false,
    },
  ]);

  // TOGGLE ATTENDANCE
  const toggleAttendance = (id) => {

    const updatedMembers = members.map((member) =>

      member.id === id
        ? { ...member, present: !member.present }
        : member
    );

    setMembers(updatedMembers);
  };

  // COUNT PRESENT MEMBERS
  const totalPresent = members.filter(
    (member) => member.present
  ).length;

  return (
    <section className="min-h-screen bg-gray-100 p-6 md:p-10">

      {/* NAVIGATION */}
      <div className="bg-white p-4 rounded-xl shadow mb-8 flex flex-wrap gap-4">

        <Link
          to="/"
          className="bg-blue-950 text-white px-5 py-2 rounded-lg hover:bg-blue-900 transition"
        >
          Home
        </Link>

        <Link
          to="/dashboard"
          className="bg-yellow-500 text-black px-5 py-2 rounded-lg hover:bg-yellow-400 transition"
        >
          Dashboard
        </Link>

        <Link
          to="/members"
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-500 transition"
        >
          Members
        </Link>

        <Link
          to="/reports"
          className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-500 transition"
        >
          Reports
        </Link>

      </div>

      {/* TOP */}
      <div className="flex justify-between items-center mb-10">

        <div>
          <h1 className="text-3xl font-bold text-blue-950">
            Attendance Management
          </h1>

          <p className="text-gray-500">
            Mark Sunday service attendance
          </p>
        </div>

        {/* TOTAL PRESENT */}
        <div className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold shadow">
          Present: {totalPresent}
        </div>

      </div>

      {/* ATTENDANCE TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-blue-950 text-white">

            <tr>

              <th className="text-left py-4 px-6">
                Member Name
              </th>

              <th className="text-left py-4 px-6">
                Attendance Status
              </th>

              <th className="text-left py-4 px-6">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {members.map((member) => (

              <tr
                key={member.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="py-4 px-6">
                  {member.name}
                </td>

                <td className="py-4 px-6">

                  {member.present ? (

                    <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium">
                      Present
                    </span>

                  ) : (

                    <span className="bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-medium">
                      Absent
                    </span>

                  )}

                </td>

                <td className="py-4 px-6">

                  <button
                    onClick={() => toggleAttendance(member.id)}
                    className={`px-5 py-2 rounded-lg font-medium transition ${
                      member.present
                        ? "bg-red-500 hover:bg-red-400 text-white"
                        : "bg-green-600 hover:bg-green-500 text-white"
                    }`}
                  >

                    {member.present
                      ? "Mark Absent"
                      : "Mark Present"}

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
};

export default Attendance;