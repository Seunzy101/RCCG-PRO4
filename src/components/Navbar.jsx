import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Branches", to: "/branches" },
    { label: "Ministries", to: "/ministries" },
    { label: "Events", to: "/events" },
    { label: "Resources", to: "/resources" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <nav className="bg-blue-950 text-white px-6 md:px-16 sticky top-0 z-50">
      {/* Top Bar */}
      <div className="flex justify-between items-center h-16">

        {/* LEFT — Logo + Title */}
        <div className="flex items-center gap-3">
          <img src={logo} className="w-10 h-10 rounded-full object-cover" alt="RCCG Logo" />
          <div>
            <h1 className="font-bold text-base leading-tight">RCCG PROV 4</h1>
            <p className="text-[10px] text-yellow-400 leading-tight max-w-[180px]">
              Jesus Christ the Same Yesterday, and Today, and Forever. Hebrews 13:8
            </p>
          </div>
        </div>

        {/* CENTER — Nav Links (desktop) */}
        <div className="hidden md:flex items-center gap-6 text-sm h-16">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`h-full flex items-center border-b-2 transition-colors duration-200 ${
                pathname === link.to
                  ? "border-yellow-400 text-yellow-400"
                  : "border-transparent text-gray-200 hover:text-yellow-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* RIGHT — Branch Login (desktop) + Hamburger (mobile) */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden md:flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-blue-950 font-bold text-sm px-4 py-2 rounded transition"
          >
            Branch Login →
          </Link>

          {/* Hamburger button (mobile only) */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded focus:outline-none"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-screen pb-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 pt-2 border-t border-blue-800">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`px-3 py-2.5 rounded text-sm font-medium transition-colors duration-200 ${
                pathname === link.to
                  ? "bg-blue-900 text-yellow-400"
                  : "text-gray-200 hover:bg-blue-900 hover:text-yellow-400"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Branch Login in mobile menu */}
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-blue-950 font-bold text-sm px-4 py-2.5 rounded transition"
          >
            Branch Login →
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
