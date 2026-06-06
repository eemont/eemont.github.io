import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Logos from "./sections/Logos";
import Contact from "./sections/Contact";

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Logos />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
