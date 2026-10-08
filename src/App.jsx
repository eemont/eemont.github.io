import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";

const Skills = lazy(() => import("./sections/Skills"));
const Projects = lazy(() => import("./sections/Projects"));
const Websites = lazy(() => import("./sections/Websites"));
const Logos = lazy(() => import("./sections/Logos"));
const Contact = lazy(() => import("./sections/Contact"));

export default function App() {
  return (
    <div className="relative isolate min-h-screen bg-ink bg-dots text-zinc-100">
      <Navbar />
      <main>
        <Hero />
        <Suspense>
          <Skills />
          <Projects />
          <Websites />
          <Logos />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
