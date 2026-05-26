import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Login = () => {

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // TEMPORARY LOGIN
    navigate("/dashboard");
  };

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-6">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

        {/* LOGO */}
        <div className="flex flex-col items-center mb-8">

          <img
            src={logo}
            alt="RCCG Logo"
            className="w-20 h-20 rounded-full mb-4"
          />

          <h1 className="text-3xl font-bold text-blue-950">
            Branch Login
          </h1>

          <p className="text-gray-500 mt-2 text-center">
            Login to manage your church branch dashboard
          </p>

        </div>

        {/* FORM */}
        <form
          className="space-y-5"
          onSubmit={handleLogin}
        >

          {/* USERNAME */}
          <div>

            <label className="block mb-2 font-medium text-gray-700">
              Username
            </label>

            <input
              type="text"
              placeholder="Enter username"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-900"
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label className="block mb-2 font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-900"
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 transition py-3 rounded-lg font-semibold text-black"
          >
            Login
          </button>

        </form>

      </div>

    </section>
  );
};

export default Login;