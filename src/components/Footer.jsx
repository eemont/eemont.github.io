export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto max-w-5xl px-4 text-sm text-zinc-400">
        © {new Date().getFullYear()} Emmanuel R. Montoya Aguilar
      </div>
    </footer>
  );
}
