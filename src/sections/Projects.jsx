import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
      <p className="mt-2 text-zinc-300">
        Here's a few things I’ve built. Click Live/Code to check them out.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>
    </section>
  );
}
