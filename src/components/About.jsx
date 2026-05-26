export default function About() {
  return (
    <section className="bg-white py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-start">

        {/* LEFT TEXT */}
        <div className="w-full lg:max-w-[280px]">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-yellow-600 text-xs font-bold tracking-widest uppercase">
              About RCCG Province 4
            </span>
            <div className="w-7 h-0.5 bg-yellow-600"></div>
          </div>

          <h2 className="text-blue-950 text-2xl md:text-3xl font-bold leading-tight mb-3">
            Growing Souls, Building Communities
          </h2>

          <p className="text-gray-500 text-sm leading-relaxed mb-5">
            RCCG Province 4 is a network of vibrant parishes dedicated to
            spreading the gospel of our Lord Jesus Christ and impacting our world.
          </p>

          <button className="bg-blue-950 text-white px-5 py-3 rounded text-sm font-bold flex items-center gap-2 hover:bg-blue-900 transition">
            Learn More About Us →
          </button>
        </div>

        {/* FEATURE CARDS */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {[
            {
              icon: "⛪",
              title: "Our Branches",
              text: "Find a church near you. We have many branches across the province.",
              link: "View Branches →",
            },
            {
              icon: "👥",
              title: "Ministries",
              text: "Explore our various ministries and find where you belong.",
              link: "Explore Ministries →",
            },
            {
              icon: "📅",
              title: "Events",
              text: "Stay updated with upcoming programs, events and activities.",
              link: "View Events →",
            },
            {
              icon: "📖",
              title: "Resources",
              text: "Sermons, devotionals, and spiritual resources for your growth.",
              link: "Explore Resources →",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col items-center text-center hover:shadow-md transition"
            >
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <span className="text-blue-950 text-xl">{item.icon}</span>
              </div>

              <h3 className="text-blue-950 font-bold text-sm mb-2">
                {item.title}
              </h3>

              <p className="text-gray-500 text-xs leading-relaxed mb-3">
                {item.text}
              </p>

              <a
                href="#"
                className="text-blue-950 text-xs font-bold mt-auto hover:underline"
              >
                {item.link}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}