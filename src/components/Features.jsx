const features = [
  {
    title: "Our Branches",
    text: "Find a church near you.",
  },
  {
    title: "Ministries",
    text: "Explore various ministries.",
  },
  {
    title: "Events",
    text: "Stay updated with programs.",
  },
  {
    title: "Resources",
    text: "Sermons and devotionals.",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6">

        {features.map((item, i) => (
          <div
            key={i}
            className="p-6 rounded-xl shadow-md text-center hover:shadow-xl transition"
          >
            <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full mb-4"></div>
            <h3 className="font-bold">{item.title}</h3>
            <p className="text-sm text-gray-500 mt-2">{item.text}</p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Features;
