export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <a href="#top" className="flex items-center gap-6 font-semibold tracking-tight">
          <img
            src="/projects/EMlogoWHITE.png"
            alt="Logo"
            className="h-8 w-8 rounded-md transition-opacity duration-200 hover:opacity-80"
          />
        </a>
        <nav className="flex items-center gap-4 text-sm text-zinc-300">
          <a
            className="relative hover:text-white transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            href="#top"
          >
            Home
          </a>

          <a
            className="relative hover:text-white transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            href="#projects"
          >
            Projects
          </a>

          <a
            className="relative hover:text-white transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            href="#logos"
          >
            Logos
          </a>

          <a
            className="relative hover:text-white transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            href="#contact"
          >
            Contact
          </a>

          <a
            className="rounded-lg border border-white/10 px-3 py-1.5 transition-all duration-200 hover:border-white/20 hover:bg-white/5 hover:text-white"
            href="https://docs.google.com/document/d/18BPKCWXhiGvv7LqWIu_jk13Zie6PvaGT0QFumCX5Jbc/export?format=pdf"
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
