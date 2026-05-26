export default function Footer() {
  return (
    <footer>

      {/* BANNER */}
      <div className="bg-blue-950 px-6 md:px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4 flex-1">
          <span className="text-yellow-500 text-5xl leading-none font-serif">"</span>
          <div>
            <p className="text-blue-200 text-sm leading-relaxed max-w-md">
              Go ye therefore, and teach all nations, baptizing them in the name of
              the Father, and of the Son, and of the Holy Ghost.
            </p>
            <p className="text-yellow-500 text-sm font-bold mt-1">– Matthew 28:19</p>
          </div>
        </div>

        <div className="flex items-center gap-4 md:border-l md:border-blue-800 md:pl-6 w-full md:w-auto">
          <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-yellow-500 text-lg shrink-0">
            👥
          </div>
          <div className="flex-1 md:flex-none">
            <h4 className="text-white text-sm font-bold">Are you a branch?</h4>
            <p className="text-blue-400 text-xs">Login to your branch dashboard</p>
          </div>
          <button className="bg-yellow-600 text-white px-4 py-2.5 rounded text-sm font-bold flex items-center gap-2 whitespace-nowrap shrink-0">
            Branch Login →
          </button>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="bg-blue-900 px-6 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <p className="text-blue-300 text-xs">
          © {new Date().getFullYear()} RCCG Province 4. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a href="#" className="text-blue-300 text-xs hover:text-white">Privacy Policy</a>
          <a href="#" className="text-blue-300 text-xs hover:text-white">Terms of Use</a>
          <a href="#" className="text-blue-300 text-xs hover:text-white">Contact</a>
        </div>
      </div>

    </footer>
  );
}
