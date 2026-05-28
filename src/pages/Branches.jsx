import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Branches = () => {
  const navigate = useNavigate();

  // =========================
  // USER INFO
  // =========================
  const branchInfo = JSON.parse(
    localStorage.getItem("branchInfo")
  );

  // =========================
  // STATES
  // =========================
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // FORM STATE
  // =========================
  const [formData, setFormData] = useState({
    branchName: "",
    username: "",
    password: "",
    location: "",
    pastor: "",
  });

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("branchInfo");
    navigate("/login");
  };

  // =========================
  // CONFIG
  // =========================
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${branchInfo?.token}`,
    },
  };

  // =========================
  // FETCH BRANCHES
  // =========================
  const fetchBranches = async () => {
    try {
      const { data } = await axios.get(
        "https://rccg-pro4.onrender.com/api/branches",
        config
      );

      setBranches(data);

    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message ||
        "Failed to load branches"
      );
    }
  };

  // =========================
  // PAGE PROTECTION
  // =========================
  useEffect(() => {

    // NOT LOGGED IN
    if (!branchInfo?.token) {
      navigate("/login");
      return;
    }

    // NOT ADMIN
    if (branchInfo?.role !== "admin") {
      navigate("/dashboard");
      return;
    }

    fetchBranches();

  }, []);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // =========================
  // CREATE BRANCH
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {

      const { data } = await axios.post(
        "https://rccg-pro4.onrender.com/api/branches",
        formData,
        config
      );

      // ADD NEW BRANCH TO LIST
      setBranches((prev) => [data, ...prev]);

      // CLEAR FORM
      setFormData({
        branchName: "",
        username: "",
        password: "",
        location: "",
        pastor: "",
      });

      alert("Branch created successfully");

    } catch (error) {

      console.log(error);

      setError(
        error.response?.data?.message ||
        "Failed to create branch"
      );

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // DELETE BRANCH
  // =========================
  const deleteBranch = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this branch?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `https://rccg-pro4.onrender.com/api/branches/${id}`,
        config
      );

      setBranches((prev) =>
        prev.filter((branch) => branch._id !== id)
      );

      alert("Branch deleted");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to delete branch"
      );
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 p-4 md:p-8">

      {/* TOP NAV */}
      <div className="bg-white p-4 rounded-2xl shadow mb-8 flex flex-wrap justify-between gap-4">

        <div className="flex flex-wrap gap-3">

          <Link
            to="/dashboard"
            className="bg-blue-950 text-white px-5 py-2 rounded-lg"
          >
            Dashboard
          </Link>

          <Link
            to="/members"
            className="bg-green-600 text-white px-5 py-2 rounded-lg"
          >
            Members
          </Link>

          <Link
            to="/attendance"
            className="bg-yellow-500 text-black px-5 py-2 rounded-lg"
          >
            Attendance
          </Link>

          <Link
            to="/reports"
            className="bg-purple-600 text-white px-5 py-2 rounded-lg"
          >
            Reports
          </Link>

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-5 mb-8">

        <div>
          <h1 className="text-4xl font-bold text-blue-950">
            Branch Management
          </h1>

          <p className="text-gray-500 mt-2">
            Create and manage all branches
          </p>
        </div>

        <div className="bg-blue-950 text-white px-6 py-4 rounded-2xl">
          <p>Total Branches</p>

          <h2 className="text-3xl font-bold">
            {branches.length}
          </h2>
        </div>

      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-6">
          {error}
        </div>
      )}

      {/* CREATE FORM */}
      <div className="bg-white p-6 rounded-2xl shadow mb-10">

        <h2 className="text-2xl font-bold mb-6">
          Create New Branch
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >

          <input
            type="text"
            name="branchName"
            placeholder="Branch Name"
            value={formData.branchName}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
            required
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
          />

          <input
            type="text"
            name="pastor"
            placeholder="Pastor Name"
            value={formData.pastor}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3 md:col-span-2"
          />

          <button
            type="submit"
            disabled={loading}
            className={`py-3 rounded-xl font-bold md:col-span-2 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-950 hover:bg-blue-900 text-white"
            }`}
          >
            {loading ? "Creating..." : "Create Branch"}
          </button>

        </form>

      </div>

      {/* BRANCHES TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">

        <table className="w-full min-w-[900px]">

          <thead className="bg-blue-950 text-white">

            <tr>

              <th className="text-left py-4 px-6">
                Branch
              </th>

              <th className="text-left py-4 px-6">
                Username
              </th>

              <th className="text-left py-4 px-6">
                Location
              </th>

              <th className="text-left py-4 px-6">
                Pastor
              </th>

              <th className="text-left py-4 px-6">
                Role
              </th>

              <th className="text-left py-4 px-6">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {branches.length === 0 ? (

              <tr>
                <td
                  colSpan="6"
                  className="text-center py-10 text-gray-500"
                >
                  No branches found
                </td>
              </tr>

            ) : (

              branches.map((branch) => (

                <tr
                  key={branch._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="py-4 px-6">
                    {branch.branchName}
                  </td>

                  <td className="py-4 px-6">
                    {branch.username}
                  </td>

                  <td className="py-4 px-6">
                    {branch.location}
                  </td>

                  <td className="py-4 px-6">
                    {branch.pastor}
                  </td>

                  <td className="py-4 px-6">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        branch.role === "admin"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {branch.role}
                    </span>

                  </td>

                  <td className="py-4 px-6">

                    <button
                      onClick={() => deleteBranch(branch._id)}
                      className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </section>
  );
};

export default Branches;
