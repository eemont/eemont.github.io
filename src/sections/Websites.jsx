import { ArrowRight } from "lucide-react";
import FadeIn from "../components/FadeIn";
import { websites } from "../data/websites";

const domainOf = (url) => new URL(url).hostname.replace(/^www\./, "");

export default function Websites() {
  if (websites.length === 0) return null;

  return (
    <section id="websites" className="mx-auto max-w-5xl px-4 py-16">
      <FadeIn>
        <h2 className="section-title">Websites</h2>
        <p className="mt-4 text-zinc-300">
          Sites I've designed and built for clients.
        </p>
      </FadeIn>

      <ul className="mt-8 border-t border-white/10">
        {websites.map(({ name, url, role }, i) => (
          <li key={url} className="border-b border-white/10">
            <FadeIn delay={i * 80}>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="group relative flex items-center gap-4 overflow-hidden px-2 py-5 sm:gap-6 sm:px-4 sm:py-6"
              >
                {/* Hover sweep */}
                <span className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-brand-500/15 via-brand-500/5 to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100" />
                <span className="pointer-events-none absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-brand-500 transition-transform duration-300 group-hover:scale-y-100" />

                <div className="relative min-w-0 flex-1 transition-transform duration-300 group-hover:translate-x-1">
                  <p className="truncate text-xl font-semibold tracking-tight text-zinc-100 transition-colors duration-300 group-hover:text-white sm:text-2xl">
                    {name}
                  </p>
                  <p className="mt-1 flex flex-wrap items-center gap-x-2 text-sm text-zinc-500">
                    {role && <span className="text-zinc-400">{role}</span>}
                    {role && <span aria-hidden="true">·</span>}
                    <span className="transition-colors duration-300 group-hover:text-brand-300">{domainOf(url)}</span>
                  </p>
                </div>

                <span className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/15 text-zinc-400 transition-[background-color,border-color,color,transform] duration-300 group-hover:scale-110 group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-white">
                  <ArrowRight className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                </span>
              </a>
            </FadeIn>
          </li>
        ))}
      </ul>
    </section>
  );
}
