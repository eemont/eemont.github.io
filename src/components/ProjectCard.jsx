export default function ProjectCard({ title, description, tags, links, image }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-white/20">
      <div className="aspect-[16/9] w-full bg-white/5">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : null}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-zinc-300">{description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags?.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300"
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
                className="rounded-lg bg-white text-black px-4 py-1.5 font-medium transition hover:bg-zinc-200"
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
              className="rounded-lg border border-white/20 px-4 py-1.5 font-medium text-white transition hover:bg-white/10"
            >
              Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
