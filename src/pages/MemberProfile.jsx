import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const MemberProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const branch = JSON.parse(localStorage.getItem("branchInfo"));

  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!branch?.token) {
      navigate("/login");
      return;
    }

    fetchMember();
  }, []);

  const fetchMember = async () => {
    try {
      const { data } = await axios.get(
        `https://rccg-pro4.onrender.com/api/members/${id}`,
        {
          headers: {
            Authorization: `Bearer ${branch.token}`,
          },
        }
      );

      setMember(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-bold">
        Loading Member...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 p-8">

      <Link
        to="/members"
        className="bg-blue-950 text-white px-5 py-3 rounded-xl"
      >
        ← Back
      </Link>

      <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

        <h1 className="text-4xl font-bold text-blue-950">
          {member.firstName} {member.lastName}
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mt-8">

          <div>
            <p className="text-gray-500">Gender</p>
            <h2 className="text-xl font-semibold">
              {member.gender}
            </h2>
          </div>

          <div>
            <p className="text-gray-500">Phone</p>
            <h2 className="text-xl font-semibold">
              {member.phone || "-"}
            </h2>
          </div>

          <div>
            <p className="text-gray-500">Email</p>
            <h2 className="text-xl font-semibold">
              {member.email || "-"}
            </h2>
          </div>

          <div>
            <p className="text-gray-500">Branch</p>
            <h2 className="text-xl font-semibold">
              {member.branch?.branchName}
            </h2>
          </div>

        </div>

      </div>

    </section>
  );
};

export default MemberProfile;