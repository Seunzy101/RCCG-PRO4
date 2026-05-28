import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Members = () => {

  const navigate = useNavigate();

  // LOGIN INFO
  const branchInfo = JSON.parse(
    localStorage.getItem("branchInfo")
  );



  // STATES
  const [members, setMembers] = useState([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");



  // CONFIG
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${branchInfo?.token}`,
    },
  };



  // FETCH MEMBERS
  const fetchMembers = async () => {

    try {

      const { data } = await axios.get(
        "https://rccg-pro4.onrender.com/api/members",
        config
      );

      setMembers(data);

    } catch (error) {

      console.log(error);

      if (error.response?.status === 401) {

        localStorage.removeItem("branchInfo");

        navigate("/login");
      }

      setError(
        error.response?.data?.message ||
        "Failed to fetch members"
      );
    }
  };



  // LOAD MEMBERS
  useEffect(() => {

    if (!branchInfo?.token) {

      navigate("/login");

      return;
    }

    fetchMembers();

  }, [navigate]);



  // HANDLE INPUT
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  // ADD MEMBER
  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    setError("");

    try {

      const { data } = await axios.post(
        "https://rccg-pro4.onrender.com/api/members",
        formData,
        config
      );

      setMembers((prev) => [data, ...prev]);

      setFormData({
        firstName: "",
        lastName: "",
        gender: "",
        phone: "",
        email: "",
      });

      alert("Member added successfully");

    } catch (error) {

      console.log(error);

      setError(
        error.response?.data?.message ||
        "Failed to add member"
      );

    } finally {

      setLoading(false);
    }
  };



  // DELETE MEMBER
  const deleteMember = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this member?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `https://rccg-pro4.onrender.com/api/members/${id}`,
        config
      );

      setMembers((prev) =>
        prev.filter((member) => member._id !== id)
      );

    } catch (error) {

      console.log(error);

      alert("Failed to delete member");
    }
  };



  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("branchInfo");

    navigate("/login");
  };



  // SEARCH FILTER
  const filteredMembers = members.filter((member) =>
    `${member.firstName} ${member.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );



  return (

    <section className="min-h-screen bg-gray-100 p-4 md:p-8">

      {/* TOP NAV */}
      <div className="bg-white p-4 rounded-2xl shadow mb-8 flex flex-wrap justify-between items-center gap-4">

        <div className="flex flex-wrap gap-3">

          <Link
            to="/dashboard"
            className="bg-blue-950 text-white px-5 py-2 rounded-lg"
          >
            Dashboard
          </Link>



          <Link
            to="/attendance"
            className="bg-green-600 text-white px-5 py-2 rounded-lg"
          >
            Attendance
          </Link>



          {/* ADMIN ONLY */}
          {branchInfo?.role === "admin" && (

            <Link
              to="/branches"
              className="bg-yellow-500 text-black px-5 py-2 rounded-lg"
            >
              Branches
            </Link>

          )}

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
            Members Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage church members
          </p>

        </div>



        <div className="bg-blue-950 text-white px-6 py-4 rounded-2xl">

          <p>Total Members</p>

          <h2 className="text-3xl font-bold">
            {members.length}
          </h2>

        </div>

      </div>



      {/* ERROR */}
      {error && (

        <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-5">
          {error}
        </div>

      )}



      {/* FORM */}
      <div className="bg-white p-6 rounded-2xl shadow mb-10">

        <h2 className="text-2xl font-bold mb-6">
          Add New Member
        </h2>



        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
            required
          />



          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
            required
          />



          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
          />



          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
          />



          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3 md:col-span-2"
            required
          >

            <option value="">
              Select Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

          </select>



          <button
            type="submit"
            disabled={loading}
            className={`py-3 rounded-xl font-bold md:col-span-2 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-400"
            }`}
          >

            {loading ? "Adding..." : "Add Member"}

          </button>

        </form>

      </div>



      {/* SEARCH */}
      <div className="mb-6">

        <input
          type="text"
          placeholder="Search member..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 border rounded-xl px-4 py-3"
        />

      </div>



      {/* TABLE */}
      <div className="bg-white p-6 rounded-2xl shadow overflow-x-auto">

        <h2 className="text-2xl font-bold mb-6">
          Members List
        </h2>



        {filteredMembers.length === 0 ? (

          <div className="text-center py-10 text-gray-500">
            No members found
          </div>

        ) : (

          <table className="w-full min-w-[800px]">

            <thead>

              <tr className="border-b">

                <th className="text-left py-4">
                  First Name
                </th>

                <th className="text-left py-4">
                  Last Name
                </th>

                <th className="text-left py-4">
                  Gender
                </th>

                <th className="text-left py-4">
                  Phone
                </th>

                <th className="text-left py-4">
                  Email
                </th>

                <th className="text-left py-4">
                  Actions
                </th>

              </tr>

            </thead>



            <tbody>

              {filteredMembers.map((member) => (

                <tr
                  key={member._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="py-4">
                    {member.firstName}
                  </td>

                  <td className="py-4">
                    {member.lastName}
                  </td>

                  <td className="py-4">
                    {member.gender}
                  </td>

                  <td className="py-4">
                    {member.phone}
                  </td>

                  <td className="py-4">
                    {member.email}
                  </td>

                  <td className="py-4">

                    <button
                      onClick={() => deleteMember(member._id)}
                      className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </section>
  );
};

export default Members;
