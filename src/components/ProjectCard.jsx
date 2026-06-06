export default function ProjectCard({ title, description, tags, links, image, onClick }) {
  return (
    <article
      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:shadow-xl hover:shadow-black/50 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-white/5">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : null}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold transition-colors duration-200 group-hover:text-white">{title}</h3>
        <p className="mt-2 text-sm text-zinc-300 line-clamp-3">{description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags?.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex gap-3 text-sm">
          {links?.live && (
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>

              <a
                href={links.live}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-white text-black px-4 py-1.5 font-medium transition-all duration-200 hover:bg-zinc-200 hover:shadow-md hover:shadow-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                Live
              </a>
            </div>
          )}

          {links?.code && (
            <a
              href={links.code}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-white/20 px-4 py-1.5 font-medium text-white transition-all duration-200 hover:bg-white/10 hover:border-white/40"
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
