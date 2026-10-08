const MAX_TAGS = 3;

export default function ProjectCard({ title, tags, links, image, onClick }) {
  const shownTags = tags?.slice(0, MAX_TAGS) ?? [];
  const extraTags = (tags?.length ?? 0) - shownTags.length;

  return (
    <article
      className="group flex h-full items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/60 hover:shadow-xl hover:shadow-black/50 cursor-pointer"
      onClick={onClick}
    >
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        ) : null}
      </div>

      <div className="flex min-w-0 flex-1 flex-col self-stretch">
        <h3 className="font-semibold transition-colors duration-200 group-hover:text-brand-300">{title}</h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {shownTags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-zinc-300"
            >
              {t}
            </span>
          ))}
          {extraTags > 0 && (
            <span className="rounded-full px-1.5 py-0.5 text-xs text-zinc-500">+{extraTags}</span>
          )}
        </div>

        <div className="mt-auto flex items-center gap-2 pt-3 text-xs">
          {links?.live && (
            <a
              href={links.live}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-brand-500 px-3 py-1 font-medium text-white transition-colors duration-200 hover:bg-brand-400"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400"></span>
              </span>
              Demo
            </a>
          )}

          {links?.code && (
            <a
              href={links.code}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-white/20 px-3 py-1 font-medium text-white transition-colors duration-200 hover:border-white/40 hover:bg-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
