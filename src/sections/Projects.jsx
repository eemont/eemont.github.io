import { useState } from "react";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import FadeIn from "../components/FadeIn";
import { projects } from "../data/projects";

export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" className="mx-auto max-w-5xl px-4 py-16">
      <FadeIn>
        <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
        <p className="mt-2 text-zinc-300">
          Here's a few things I've built. Click a card for more details.
        </p>
      </FadeIn>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {projects.map((p, i) => (
          <FadeIn key={p.title} delay={i * 100}>
            <ProjectCard {...p} onClick={() => setSelected(p)} />
          </FadeIn>
        ))}
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
