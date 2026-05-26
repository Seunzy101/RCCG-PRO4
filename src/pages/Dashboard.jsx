import {
  FaUsers,
  FaClipboardCheck,
  FaChurch,
  FaChartBar,
  FaBars,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="min-h-screen bg-gray-100 flex">

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-950 text-white p-3 rounded-lg shadow-lg"
      >
        <FaBars />
      </button>

      {/* SIDEBAR */}
      <div
        className={`
          fixed md:static top-0 left-0 h-full w-64 bg-blue-950 text-white p-6 z-40 transform transition-transform duration-300

          ${menuOpen ? "translate-x-0" : "-translate-x-full"}

          md:translate-x-0
        `}
      >

        <h1 className="text-2xl font-bold mb-10 mt-10 md:mt-0">
          RCCG PROV 4
        </h1>

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

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4 md:p-10 w-full">

        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 mb-10 mt-16 md:mt-0">

          <div>

            <h1 className="text-3xl md:text-4xl font-bold text-blue-950">
              Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Welcome back, RCCG Living Faith Parish
            </p>

          </div>

          <button className="bg-yellow-500 hover:bg-yellow-400 transition px-5 py-3 rounded-lg font-semibold w-full md:w-auto">
            Take Attendance
          </button>

        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

          {/* CARD 1 */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Total Members
                </p>

                <h2 className="text-3xl md:text-4xl font-bold mt-2">
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

                <p className="text-gray-500">
                  Attendance Today
                </p>

                <h2 className="text-3xl md:text-4xl font-bold mt-2">
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

                <p className="text-gray-500">
                  Branches
                </p>

                <h2 className="text-3xl md:text-4xl font-bold mt-2">
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

                <p className="text-gray-500">
                  Monthly Growth
                </p>

                <h2 className="text-3xl md:text-4xl font-bold mt-2">
                  +15%
                </h2>

              </div>

              <FaChartBar className="text-4xl text-purple-600" />

            </div>

          </div>

        </div>

        {/* RECENT ACTIVITY */}
        <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">

          <h2 className="text-2xl font-bold text-blue-950 mb-6">
            Recent Attendance Activity
          </h2>

          <div className="space-y-4 min-w-[300px]">

            <div className="flex justify-between border-b pb-3">
              <p>Sunday Service Attendance</p>
              <span className="font-semibold">
                240 Present
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <p>Bible Study Attendance</p>
              <span className="font-semibold">
                120 Present
              </span>
            </div>

            <div className="flex justify-between">
              <p>Youth Service Attendance</p>
              <span className="font-semibold">
                85 Present
              </span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Dashboard;