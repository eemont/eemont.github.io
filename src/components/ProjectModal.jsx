import { useEffect } from "react";
import { FaGithub, FaExternalLinkAlt, FaTimes, FaCheckCircle } from "react-icons/fa";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 bg-black/70 backdrop-blur-sm sm:items-center sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-h-[92vh] overflow-y-auto rounded-t-2xl border-t border-x border-white/15 bg-zinc-900 shadow-2xl sm:rounded-2xl sm:border sm:max-w-2xl animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner image */}
        {project.image && (
          <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-white/5">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent" />
          </div>
        )}

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-zinc-300 backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-white"
          aria-label="Close"
        >
          <FaTimes className="text-sm" />
        </button>

        {/* Content */}
        <div className="p-6">
          {/* Title + tags */}
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-sky-200 via-white to-violet-200 bg-clip-text text-transparent">
            {project.title}
          </h2>

          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags?.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Description */}
          {project.details && (
            <p className="mt-5 text-sm leading-relaxed text-zinc-300">
              {project.details}
            </p>
          )}

          {/* Features */}
          {project.features?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Highlights
              </h3>
              <ul className="mt-3 space-y-2">
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-zinc-300">
                    <FaCheckCircle className="mt-0.5 shrink-0 text-sky-400 text-base" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Links */}
          <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6">
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10"
              >
                <FaExternalLinkAlt className="text-xs" />
                Live demo
              </a>
            )}
            {project.links?.code && (
              <a
                href={project.links.code}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:border-white/40 hover:bg-white/10 hover:-translate-y-0.5"
              >
                <FaGithub className="text-base" />
                View code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
