import { Link } from "react-router-dom";
import {
  FaUsers,
  FaClipboardCheck,
  FaChartLine,
  FaChurch,
} from "react-icons/fa";

const Reports = () => {

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
          to="/attendance"
          className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-500 transition"
        >
          Attendance
        </Link>

      </div>

      {/* PAGE TITLE */}
      <div className="mb-10">

        <h1 className="text-4xl font-bold text-blue-950">
          Reports & Analytics
        </h1>

        <p className="text-gray-500 mt-2">
          Overview of church growth and attendance performance
        </p>

      </div>

      {/* REPORT CARDS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        {/* TOTAL MEMBERS */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-gray-500">
                Total Members
              </p>

              <h2 className="text-4xl font-bold mt-2">
                350
              </h2>
            </div>

            <FaUsers className="text-4xl text-blue-950" />

          </div>

        </div>

        {/* WEEKLY ATTENDANCE */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-gray-500">
                Weekly Attendance
              </p>

              <h2 className="text-4xl font-bold mt-2">
                240
              </h2>
            </div>

            <FaClipboardCheck className="text-4xl text-green-600" />

          </div>

        </div>

        {/* MONTHLY GROWTH */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-gray-500">
                Monthly Growth
              </p>

              <h2 className="text-4xl font-bold mt-2">
                +15%
              </h2>
            </div>

            <FaChartLine className="text-4xl text-yellow-500" />

          </div>

        </div>

        {/* TOTAL BRANCHES */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-gray-500">
                Total Branches
              </p>

              <h2 className="text-4xl font-bold mt-2">
                18
              </h2>
            </div>

            <FaChurch className="text-4xl text-purple-600" />

          </div>

        </div>

      </div>

      {/* WEEKLY REPORT TABLE */}
      <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">

        <h2 className="text-2xl font-bold text-blue-950 mb-6">
          Weekly Attendance Report
        </h2>

        <table className="w-full">

          <thead className="bg-blue-950 text-white">

            <tr>

              <th className="text-left py-4 px-6">
                Service
              </th>

              <th className="text-left py-4 px-6">
                Attendance
              </th>

              <th className="text-left py-4 px-6">
                Growth
              </th>

            </tr>

          </thead>

          <tbody>

            <tr className="border-b hover:bg-gray-50">

              <td className="py-4 px-6">
                Sunday Service
              </td>

              <td className="py-4 px-6">
                240 Members
              </td>

              <td className="py-4 px-6 text-green-600 font-semibold">
                +12%
              </td>

            </tr>

            <tr className="border-b hover:bg-gray-50">

              <td className="py-4 px-6">
                Bible Study
              </td>

              <td className="py-4 px-6">
                120 Members
              </td>

              <td className="py-4 px-6 text-green-600 font-semibold">
                +8%
              </td>

            </tr>

            <tr className="hover:bg-gray-50">

              <td className="py-4 px-6">
                Youth Service
              </td>

              <td className="py-4 px-6">
                85 Members
              </td>

              <td className="py-4 px-6 text-red-500 font-semibold">
                -2%
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </section>
  );
};

export default Reports;