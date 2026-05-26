import { Link } from "react-router-dom";
import church from "../assets/church.png";

const Hero = () => {
  return (
    <section className="relative w-full h-[520px] flex items-center overflow-hidden bg-blue-950">

      {/* Church image — right side only */}
      <div
        className="absolute right-0 top-0 w-[55%] h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${church})` }}
      >
        {/* Fade from left so text side is clean */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-10 md:px-16 max-w-xl">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-yellow-400 text-xs font-bold tracking-[3px] uppercase">
            Welcome To
          </span>
          <div className="w-8 h-[2px] bg-yellow-400"></div>
        </div>

        {/* Heading */}
        <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight">
          RCCG Province 4
        </h1>

        {/* Description */}
        <p className="text-blue-200 mt-4 text-base leading-relaxed max-w-md">
          A family of churches committed to making heaven, taking as many
          people with us, and having a member of RCCG in every family of all nations.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mt-8 flex-wrap">
          <Link
            to="/branches"
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-blue-950 font-bold text-sm px-6 py-3 rounded transition"
          >
            👥 Our Branches
          </Link>

          <button className="flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-blue-950 font-bold text-sm px-6 py-3 rounded transition">
            ▶ Watch Live Service
          </button>
        </div>

      </div>
    </section>
  );
};

export default Hero;