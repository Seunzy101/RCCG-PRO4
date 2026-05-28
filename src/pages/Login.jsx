import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";

const Login = () => {

  const navigate = useNavigate();

  // =========================
  // FORM STATE
  // =========================
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // =========================
  // STATES
  // =========================
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");



  // =========================
  // REDIRECT IF ALREADY LOGGED IN
  // =========================
  useEffect(() => {

    const stored = localStorage.getItem("branchInfo");

    if (!stored) return;

    try {

      const parsed = JSON.parse(stored);

      if (parsed?.token) {

        // IMPORTANT
        navigate("/dashboard");
      }

    } catch (error) {

      localStorage.removeItem("branchInfo");
    }

  }, [navigate]);



  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  // =========================
  // HANDLE LOGIN
  // =========================
  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    setError("");

    try {

      const { data } = await axios.post(
        "http://rccg-pro4.onrender.com/api/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );



      console.log(data);



      // =========================
      // SAFETY CHECK
      // =========================
      if (!data || !data.token) {

        throw new Error("Invalid server response");
      }



      // =========================
      // SAVE USER INFO
      // =========================
      const userData = {
        token: data.token,
        role: data.role,
        branchName: data.branchName,
        username: data.username,
        id: data._id,
      };



      localStorage.setItem(
        "branchInfo",
        JSON.stringify(userData)
      );



      // =========================
      // SUCCESS
      // =========================
      alert("Login successful");



      // IMPORTANT
      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      setError(
        error.response?.data?.message ||
        error.message ||
        "Unable to login"
      );

    } finally {

      setLoading(false);
    }
  };



  return (

    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">

        {/* LOGO */}
        <div className="flex flex-col items-center mb-8">

          <img
            src={logo}
            alt="RCCG Logo"
            className="w-24 h-24 rounded-full mb-4 object-cover"
          />

          <h1 className="text-3xl font-bold text-blue-950">
            RCCG Province 4
          </h1>

          <p className="text-gray-500 mt-2 text-center">
            Branch Management Portal
          </p>

        </div>



        {/* ERROR */}
        {error && (

          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl mb-5">

            {error}

          </div>

        )}



        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* USERNAME */}
          <div>

            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Username
            </label>

            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-950"
              required
            />

          </div>



          {/* PASSWORD */}
          <div>

            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-950"
              required
            />

          </div>



          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-400 text-black"
            }`}
          >

            {loading ? "Logging in..." : "Login"}

          </button>

        </form>

      </div>

    </section>
  );
};

export default Login;