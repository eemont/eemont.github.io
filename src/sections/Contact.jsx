import { FaGithub, FaLinkedin, FaDiscord, FaEnvelope } from "react-icons/fa";
import { socials } from "../data/socials";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-4 py-16">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-2xl font-bold tracking-tight">Contact</h2>
        <p className="mt-2 text-zinc-300">
          Reach out — I'd love to connect and collaborate on interesting projects!
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:opacity-90"
            href={`mailto:${socials.email}`}
          >
            <FaEnvelope className="text-zinc-700 text-base" />
            Email me
          </a>

          <a
            className="flex items-center gap-2 rounded-xl border border-[#0A66C2]/60 bg-[#0A66C2]/10 px-4 py-2 text-sm font-semibold text-[#5eaeff] transition-colors hover:border-[#0A66C2] hover:bg-[#0A66C2]/20"
            href={socials.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin className="text-[#0A66C2] text-base" />
            LinkedIn
          </a>

          <a
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold transition-colors hover:border-white/40 hover:bg-white/10"
            href={socials.github}
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub className="text-white text-base" />
            GitHub
          </a>

          <a
            className="flex items-center gap-2 rounded-xl border border-[#5865F2]/60 bg-[#5865F2]/10 px-4 py-2 text-sm font-semibold text-[#a5b4fc] transition-colors hover:border-[#5865F2] hover:bg-[#5865F2]/20"
            href={socials.discord}
            target="_blank"
            rel="noreferrer"
          >
            <FaDiscord className="text-[#5865F2] text-base" />
            Discord
          </a>
        </div>
      </div>
    </section>
  );
}

console.log("Contact component loaded");
