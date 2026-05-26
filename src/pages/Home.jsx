import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="font-sans bg-white">
      <Navbar />
      <Hero />
      <About />
      <Footer />
    </div>
  );
};

export default Home;