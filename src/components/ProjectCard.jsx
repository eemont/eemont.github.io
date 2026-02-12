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
          {links?.live ? (
            <a
              className="text-white hover:underline"
              href={links.live}
              target="_blank"
              rel="noreferrer"
            >
              Live
            </a>
          ) : null}
          {links?.code ? (
            <a
              className="text-white hover:underline"
              href={links.code}
              target="_blank"
              rel="noreferrer"
            >
              Code
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
