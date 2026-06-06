import { FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";
import { socials } from "../data/socials";
import FadeIn from "../components/FadeIn";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2"
    >
      {/* Background glow blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute top-20 right-1/4 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      {/* IMAGE (TOP ON MOBILE, RIGHT ON DESKTOP) */}
      <FadeIn className="order-1 flex justify-center md:order-2 md:justify-end" delay={150}>
        <div className="relative">
          <div className="absolute inset-0 scale-110 rounded-full bg-sky-500/15 blur-2xl" />
          <div className="relative h-72 w-72 overflow-hidden rounded-full border-2 border-white/20 ring-2 ring-sky-500/20 sm:h-80 sm:w-80">
            <img
              src="/IMG_0428.JPG"
              alt="Emmanuel Montoya Aguilar"
              className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </FadeIn>

      {/* TEXT (BOTTOM ON MOBILE, LEFT ON DESKTOP) */}
      <FadeIn className="order-2 md:order-1">
        <p className="text-sm text-zinc-400">Software Developer</p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-sky-200 via-white to-violet-200 bg-clip-text text-transparent">
          Hi, I'm Emmanuel.
        </h1>

        <p className="mt-5 max-w-2xl text-zinc-300">
          I'm a Computer Science graduate who loves building modern
          applications and bringing ideas to life with clean design and real
          backend functionality.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:shadow-white/10 hover:-translate-y-0.5"
          >
            View projects
          </a>

          <a
            href="https://docs.google.com/document/d/18BPKCWXhiGvv7LqWIu_jk13Zie6PvaGT0QFumCX5Jbc/export?format=pdf"
            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold transition-all duration-200 hover:border-white/20 hover:bg-white/5 hover:-translate-y-0.5"
          >
            Download resume
          </a>

          <a
            href={socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl border border-[#0A66C2]/60 bg-[#0A66C2]/10 px-4 py-2 text-sm font-semibold text-[#5eaeff] transition-all duration-200 hover:border-[#0A66C2] hover:bg-[#0A66C2]/20 hover:-translate-y-0.5"
          >
            <FaLinkedin className="text-[#0A66C2] text-base" />
            LinkedIn
          </a>

          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold transition-all duration-200 hover:border-white/40 hover:bg-white/10 hover:-translate-y-0.5"
          >
            <FaGithub className="text-white text-base" />
            GitHub
          </a>

          <a
            href={socials.discord}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl border border-[#5865F2]/60 bg-[#5865F2]/10 px-4 py-2 text-sm font-semibold text-[#a5b4fc] transition-all duration-200 hover:border-[#5865F2] hover:bg-[#5865F2]/20 hover:-translate-y-0.5"
          >
            <FaDiscord className="text-[#5865F2] text-base" />
            Discord
          </a>
        </div>
      </FadeIn>

      {/* SKILLS TAGS (FULL WIDTH BELOW BOTH) */}
      <FadeIn className="order-3 md:col-span-2 mt-6 flex flex-wrap gap-2 text-xs text-zinc-400" delay={300}>
        {[
          { name: "C++",                url: "https://cplusplus.com/" },
          { name: "Python",             url: "https://www.python.org/" },
          { name: "C",                  url: "https://www.c-language.org/" },
          { name: "C#",                 url: "https://dotnet.microsoft.com/en-us/languages/csharp" },
          { name: "HTML",               url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
          { name: "CSS",                url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
          { name: "JavaScript",         url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
          { name: "Swift",              url: "https://www.swift.org/" },
          { name: "Dart",               url: "https://dart.dev/" },
          { name: "SQL",                url: "https://www.w3schools.com/sql/" },
          { name: "PHP",                url: "https://www.php.net/" },
          { name: "JSON",               url: "https://www.json.org/" },
          { name: "Assembly",           url: "https://en.wikipedia.org/wiki/Assembly_language" },
          { name: "React",              url: "https://react.dev/" },
          { name: "Vite",               url: "https://vitejs.dev/" },
          { name: "Tailwind",           url: "https://tailwindcss.com/" },
          { name: "Supabase",           url: "https://supabase.com/" },
          { name: "Vercel",             url: "https://vercel.com/" },
          { name: "React Native",       url: "https://reactnative.dev/" },
          { name: "MongoDB",            url: "https://www.mongodb.com/" },
          { name: "Render",             url: "https://render.com/" },
          { name: "Flutter",            url: "https://flutter.dev/" },
          { name: "GitHub",             url: "https://github.com/" },
          { name: "GitHub Actions",     url: "https://github.com/features/actions" },
          { name: "Microsoft Office365",url: "https://www.microsoft.com/en-us/microsoft-365" },
          { name: "Adobe Suite",        url: "https://www.adobe.com/creativecloud.html" },
          { name: "UE5",                url: "https://www.unrealengine.com/" },
          { name: "Unity",              url: "https://unity.com/" },
          { name: "Figma",              url: "https://www.figma.com/" },
          { name: "NodeJS",             url: "https://nodejs.org/" },
          { name: "Express",            url: "https://expressjs.com/" },
        ].map(({ name, url }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/10 px-3 py-1 transition-all duration-200 hover:border-white/30 hover:bg-white/10 hover:text-zinc-100 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(255,255,255,0.06)]"
          >
            {name}
          </a>
        ))}
      </FadeIn>
    </section>
  );
}
