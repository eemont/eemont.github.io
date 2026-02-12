import { socials } from "../data/socials";

export default function Hero() {
  return (
    <section
      id="top"
      className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2"
    >
        {/* LEFT SIDE TEXT */}
        <div>
            <p className="text-sm text-zinc-400">Software Developer</p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Hi, I’m Emmanuel.
            </h1>

            <p className="mt-5 max-w-2xl text-zinc-300">
            I'm an upcoming Computer Science graduate who loves building modern
            applications and bringing ideas to life with clean design and real
            backend functionality.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
            <a
                href="#projects"
                className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:opacity-90"
            >
                View projects
            </a>

            <a
                href="https://docs.google.com/document/d/18BPKCWXhiGvv7LqWIu_jk13Zie6PvaGT0QFumCX5Jbc/export?format=pdf"
                className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold hover:border-white/20 hover:bg-white/5"
            >
                Download resume
            </a>

            <a
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold hover:border-white/20 hover:bg-white/5"
            >
                LinkedIn
            </a>

            <a
                href={socials.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold hover:border-white/20 hover:bg-white/5"
            >
                GitHub
            </a>

            <a
                href={socials.discord}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold hover:border-white/20 hover:bg-white/5"
            >
                Discord
            </a>
                </div>
            </div>

            {/* RIGHT SIDE IMAGE */}
            <div className="flex justify-center md:justify-center">
                <div className="h-72 w-72 rounded-full border-2 border-white/10 overflow-hidden sm:h-80 sm:w-80">
                <img
                    src="/PORTRAIT3.JPG"
                    alt="Emmanuel Montoya Aguilar"
                    className="h-full w-full object-cover scale-125 translate-y-5"
                />
                </div>

            </div>

      {/* SKILLS TAGS (FULL WIDTH BELOW BOTH) */}
      <div className="md:col-span-2 mt-6 flex flex-wrap gap-2 text-xs text-zinc-400">
        {[
          "C++",
          "Python",
          "C",
          "C#",
          "HTML",
          "CSS",
          "JavaScript",
          "Swift",
          "Dart",
          "SQL",
          "PHP",
          "JSON",
          "Assembly",
          "React",
          "Vite",
          "Tailwind",
          "Supabase",
          "Vercel",
          "React Native",
          "MongoDB",
          "Render",
          "Flutter",
          "GitHub",
          "GitHub Actions",
          "Microsoft Office365",
          "Adobe Suite",
          "UE5",
          "Unity",
          "Figma",
          "NodeJS",
          "Express",
        ].map((t) => (
          <span key={t} className="rounded-full border border-white/10 px-3 py-1">
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}
