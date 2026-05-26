import { Link } from "react-router-dom";
import {
  FaUsers,
  FaClipboardCheck,
  FaChurch,
  FaChartBar,
} from "react-icons/fa";

const Dashboard = () => {
  return (
    <section className="min-h-screen bg-gray-100 flex">

      {/* SIDEBAR */}
      <div className="w-64 bg-blue-950 text-white p-6 hidden md:block">

        <h1 className="text-2xl font-bold mb-10">
          RCCG PROV 4
        </h1>

        <nav className="space-y-6">

          <nav className="space-y-6">

            <Link
              to="/"
              className="block hover:text-yellow-400 transition"
            >
              Home
            </Link>

            <Link
              to="/dashboard"
              className="block hover:text-yellow-400 transition"
            >
              Dashboard
            </Link>

            <Link
              to="/members"
              className="block hover:text-yellow-400 transition"
            >
              Members
            </Link>

            <Link
              to="/attendance"
              className="block hover:text-yellow-400 transition"
            >
              Attendance
            </Link>

            <Link
              to="/reports"
              className="block hover:text-yellow-400 transition"
            >
              Reports
            </Link>

          </nav>
        </nav>

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 md:p-10">

        {/* TOP */}
        <div className="flex justify-between items-center mb-10">

          <div>
            <h1 className="text-3xl font-bold text-blue-950">
              Dashboard
            </h1>

            <p className="text-gray-500">
              Welcome back, RCCG New Convenent Assembly!
            </p>
          </div>

          <button className="bg-yellow-500 hover:bg-yellow-400 transition px-5 py-3 rounded-lg font-semibold">
            Take Attendance
          </button>

        </div>

        {/* STATS CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          {/* CARD 1 */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">

            <div className="flex justify-between items-center">

              <div>
                <p className="text-gray-500">Total Members</p>

                <h2 className="text-4xl font-bold mt-2">
                  350
                </h2>
              </div>

              <FaUsers className="text-4xl text-blue-900" />

            </div>

          </div>

          {/* CARD 2 */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">

            <div className="flex justify-between items-center">

              <div>
                <p className="text-gray-500">Attendance Today</p>

                <h2 className="text-4xl font-bold mt-2">
                  240
                </h2>
              </div>

              <FaClipboardCheck className="text-4xl text-green-600" />

            </div>

          </div>

          {/* CARD 3 */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">

            <div className="flex justify-between items-center">

              <div>
                <p className="text-gray-500">Branches</p>

                <h2 className="text-4xl font-bold mt-2">
                  18
                </h2>
              </div>

              <FaChurch className="text-4xl text-yellow-500" />

            </div>

          </div>

          {/* CARD 4 */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">

            <div className="flex justify-between items-center">

              <div>
                <p className="text-gray-500">Monthly Growth</p>

                <h2 className="text-4xl font-bold mt-2">
                  +15%
                </h2>
              </div>

              <FaChartBar className="text-4xl text-purple-600" />

            </div>

          </div>

        </div>

        {/* RECENT ACTIVITY */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-2xl font-bold text-blue-950 mb-6">
            Recent Attendance Activity
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between border-b pb-3">
              <p>Sunday Service Attendance</p>
              <span className="font-semibold">240 Present</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <p>Bible Study Attendance</p>
              <span className="font-semibold">120 Present</span>
            </div>

            <div className="flex justify-between">
              <p>Youth Service Attendance</p>
              <span className="font-semibold">85 Present</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Dashboard;