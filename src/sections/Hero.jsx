import { useState } from "react";
import { GitHubIcon, LinkedInIcon, DiscordIcon } from "../components/BrandIcons";
import { socials } from "../data/socials";
import FadeIn from "../components/FadeIn";
import ResumeModal from "../components/ResumeModal";

export default function Hero() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <section id="top" className="relative">
      <div className="relative mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-[1.35fr_1fr] md:py-24">
      {/* IMAGE (TOP ON MOBILE, RIGHT ON DESKTOP) */}
      <div className="order-1 flex justify-center md:order-2 md:justify-end">
        <div className="relative h-72 w-72 overflow-hidden rounded-full shadow-[0_0_0_1px_rgba(79,142,247,0.35),0_0_24px_rgba(79,142,247,0.22),0_0_90px_24px_rgba(79,142,247,0.12)] sm:h-80 sm:w-80 md:h-72 md:w-72 lg:h-80 lg:w-80">
          <img
            src="/IMG_0428.JPG"
            alt="Emmanuel Montoya Aguilar"
            fetchPriority="high"
            width={320}
            height={320}
            className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>

      {/* TEXT (BOTTOM ON MOBILE, LEFT ON DESKTOP) */}
      <FadeIn className="order-2 md:order-1">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-400">Software Developer</p>

        {/* One line: width is ~9x the font size, so each size is capped to fit its column */}
        <h1 className="mt-3 whitespace-nowrap font-display text-[min(2.25rem,9.6vw)] font-bold uppercase leading-[0.95] tracking-wide text-white sm:text-6xl md:text-[2.5rem] lg:text-[3.5rem]">
          Hi, I'm Emmanuel.
        </h1>
        <div className="mt-5 h-[3px] w-24 rounded-full bg-brand-500" />

        <p className="mt-5 max-w-2xl text-zinc-300">
          I'm a Computer Science graduate who loves building modern
          applications and bringing ideas to life with clean design and real
          backend functionality.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-400 hover:shadow-lg hover:shadow-brand-500/30 hover:-translate-y-0.5"
          >
            View projects
          </a>

          <button
            onClick={() => setResumeOpen(true)}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold transition-all duration-200 hover:border-white/20 hover:bg-white/5 hover:-translate-y-0.5"
          >
            View resume
          </button>

          <a
            href={socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl border border-[#0A66C2]/60 bg-[#0A66C2]/10 px-4 py-2 text-sm font-semibold text-[#5eaeff] transition-all duration-200 hover:border-[#0A66C2] hover:bg-[#0A66C2]/20 hover:-translate-y-0.5"
          >
            <LinkedInIcon className="text-[#0A66C2] text-base w-[1em] h-[1em]" />
            LinkedIn
          </a>

          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold transition-all duration-200 hover:border-white/40 hover:bg-white/10 hover:-translate-y-0.5"
          >
            <GitHubIcon className="text-white text-base w-[1em] h-[1em]" />
            GitHub
          </a>

          {/* <a
            href={socials.discord}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl border border-[#5865F2]/60 bg-[#5865F2]/10 px-4 py-2 text-sm font-semibold text-[#a5b4fc] transition-all duration-200 hover:border-[#5865F2] hover:bg-[#5865F2]/20 hover:-translate-y-0.5"
          >
            <DiscordIcon className="text-[#5865F2] text-base w-[1em] h-[1em]" />
            Discord
          </a> */}
        </div>
      </FadeIn>
      </div>

      {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
    </section>
  );
}
