import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";

const Skills = lazy(() => import("./sections/Skills"));
const Projects = lazy(() => import("./sections/Projects"));
const Logos = lazy(() => import("./sections/Logos"));
const Contact = lazy(() => import("./sections/Contact"));

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />
      <main>
        <Hero />
        <Suspense>
          <Skills />
          <Projects />
          <Logos />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
