import FadeIn from "../components/FadeIn";

const skills = [
  { name: "C++",                 url: "https://cplusplus.com/" },
  { name: "Python",              url: "https://www.python.org/" },
  { name: "C",                   url: "https://www.c-language.org/" },
  { name: "C#",                  url: "https://dotnet.microsoft.com/en-us/languages/csharp" },
  { name: "HTML",                url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { name: "CSS",                 url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { name: "JavaScript",          url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "Swift",               url: "https://www.swift.org/" },
  { name: "Dart",                url: "https://dart.dev/" },
  { name: "SQL",                 url: "https://www.w3schools.com/sql/" },
  { name: "PHP",                 url: "https://www.php.net/" },
  { name: "JSON",                url: "https://www.json.org/" },
  { name: "Assembly",            url: "https://en.wikipedia.org/wiki/Assembly_language" },
  { name: "React",               url: "https://react.dev/" },
  { name: "Vite",                url: "https://vitejs.dev/" },
  { name: "Tailwind",            url: "https://tailwindcss.com/" },
  { name: "Supabase",            url: "https://supabase.com/" },
  { name: "Vercel",              url: "https://vercel.com/" },
  { name: "React Native",        url: "https://reactnative.dev/" },
  { name: "MongoDB",             url: "https://www.mongodb.com/" },
  { name: "Render",              url: "https://render.com/" },
  { name: "Flutter",             url: "https://flutter.dev/" },
  { name: "GitHub",              url: "https://github.com/" },
  { name: "GitHub Actions",      url: "https://github.com/features/actions" },
  { name: "Microsoft Office 365",url: "https://www.microsoft.com/en-us/microsoft-365" },
  { name: "Adobe Suite",         url: "https://www.adobe.com/creativecloud.html" },
  { name: "UE5",                 url: "https://www.unrealengine.com/" },
  { name: "Unity",               url: "https://unity.com/" },
  { name: "Figma",               url: "https://www.figma.com/" },
  { name: "NodeJS",              url: "https://nodejs.org/" },
  { name: "Express",             url: "https://expressjs.com/" },
];

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-4 py-16">
      <FadeIn>
        <h2 className="text-2xl font-bold tracking-tight">Skills</h2>
        <p className="mt-2 text-zinc-300">
          Technologies and tools I've worked with.
        </p>
      </FadeIn>

      <FadeIn delay={100}>
        <div className="mt-8 flex flex-wrap gap-2 text-xs text-zinc-400">
          {skills.map(({ name, url }) => (
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
        </div>
      </FadeIn>
    </section>
  );
}
