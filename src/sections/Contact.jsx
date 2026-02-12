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
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:opacity-90"
            href={`mailto:${socials.email}`}
          >
            Email me
          </a>

          <a
            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold hover:border-white/20 hover:bg-white/5"
            href={socials.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>

          <a
            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold hover:border-white/20 hover:bg-white/5"
            href={socials.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

                    <a
            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold hover:border-white/20 hover:bg-white/5"
            href={socials.discord}
            target="_blank"
            rel="noreferrer"
          >
            Discord
          </a>
        </div>
      </div>
    </section>
  );
}

console.log("Contact component loaded");
