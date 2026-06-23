import { useState } from "react";

const links = [
  { label: "Home",     href: "#top" },
  { label: "Skills",   href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Logos",    href: "#logos" },
  { label: "Contact",  href: "#contact" },
];

const resumeHref =
  "https://docs.google.com/document/d/18BPKCWXhiGvv7LqWIu_jk13Zie6PvaGT0QFumCX5Jbc/export?format=pdf";

const linkClass =
  "relative hover:text-white transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full";

function scrollTo(href) {
  if (href === "#top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleClick = (e, href) => {
    e.preventDefault();
    scrollTo(href);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <a
          href="#top"
          onClick={(e) => handleClick(e, "#top")}
          className="flex items-center gap-6 font-semibold tracking-tight"
        >
          <img
            src="/projects/EMlogoWHITE.webp"
            alt="Logo"
            className="h-8 w-8 rounded-md transition-opacity duration-200 hover:opacity-80"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4 text-sm text-zinc-300">
          {links.map(({ label, href }) => (
            <a
              key={label}
              className={linkClass}
              href={href}
              onClick={(e) => handleClick(e, href)}
            >
              {label}
            </a>
          ))}
          <a
            className="rounded-lg border border-white/10 px-3 py-1.5 transition-all duration-200 hover:border-white/20 hover:bg-white/5 hover:text-white"
            href={resumeHref}
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>
        </nav>

        {/* Hamburger button — mobile only */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 p-2 text-zinc-300 hover:text-white"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-5 bg-current transition-all duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-5 bg-current transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-5 bg-current transition-all duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <nav className="flex flex-col gap-1 px-4 pb-4 text-sm text-zinc-300">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="rounded-lg px-3 py-2 hover:bg-white/5 hover:text-white transition-colors duration-200"
              onClick={(e) => handleClick(e, href)}
            >
              {label}
            </a>
          ))}
          <a
            href={resumeHref}
            target="_blank"
            rel="noreferrer"
            className="mt-1 rounded-lg border border-white/10 px-3 py-2 hover:border-white/20 hover:bg-white/5 hover:text-white transition-all duration-200"
            onClick={() => setOpen(false)}
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
