import { useState } from "react";
import { Link } from "react-router-dom";

const Members = () => {

  // TEMPORARY STATE
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "John Doe",
      gender: "Male",
      phone: "08012345678",
    },

    {
      id: 2,
      name: "Mary Johnson",
      gender: "Female",
      phone: "08098765432",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    phone: "",
  });

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ADD MEMBER
  const handleSubmit = (e) => {
    e.preventDefault();

    const newMember = {
      id: Date.now(),
      ...formData,
    };

    setMembers([...members, newMember]);

    setFormData({
      name: "",
      gender: "",
      phone: "",
    });
  };

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
          to="/attendance"
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-500 transition"
        >
          Attendance
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
            Members Management
          </h1>

          <p className="text-gray-500">
            Manage church members for your branch
          </p>
        </div>

      </div>

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">

        <h2 className="text-2xl font-bold mb-6 text-blue-950">
          Add New Member
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-3 gap-5"
        >

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-900"
            required
          />

          {/* GENDER */}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-900"
            required
          >

            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>

          </select>

          {/* PHONE */}
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-900"
            required
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-400 transition py-3 rounded-lg font-semibold text-black md:col-span-3"
          >
            Add Member
          </button>

        </form>

      </div>

      {/* MEMBERS TABLE */}
      <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">

        <h2 className="text-2xl font-bold mb-6 text-blue-950">
          Members List
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b text-left">

              <th className="py-3">Full Name</th>

              <th className="py-3">Gender</th>

              <th className="py-3">Phone</th>

            </tr>

          </thead>

          <tbody>

            {members.map((member) => (

              <tr
                key={member.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="py-4">
                  {member.name}
                </td>

                <td className="py-4">
                  {member.gender}
                </td>

                <td className="py-4">
                  {member.phone}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
};

export default Members;