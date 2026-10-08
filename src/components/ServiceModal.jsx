import { useEffect } from "react";
import { FaTimes, FaCheckCircle } from "react-icons/fa";

export default function ServiceModal({ service, onClose, onContact }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 p-0 animate-fade-in sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-h-[92vh] overflow-y-auto rounded-t-2xl border-t border-x border-white/15 bg-zinc-900 shadow-2xl sm:rounded-2xl sm:border sm:max-w-2xl animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-zinc-300 backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-white"
          aria-label="Close"
        >
          <FaTimes className="text-sm" />
        </button>

        <div className="p-6">
          <span className={`self-start rounded-full border px-2.5 py-0.5 text-xs font-semibold ${service.badgeClass}`}>
            {service.badge}
          </span>

          <h2 className="mt-3 text-2xl font-bold tracking-tight bg-gradient-to-r from-sky-200 via-white to-violet-200 bg-clip-text text-transparent">
            {service.title}
          </h2>

          <p className="mt-1 font-mono text-sm font-semibold text-zinc-300">
            {service.rate}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-zinc-300">
            {service.details}
          </p>

          {service.includes?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                What's included
              </h3>
              <ul className="mt-3 space-y-2">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                    <FaCheckCircle className="mt-0.5 shrink-0 text-sky-400 text-base" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(service.timeline || service.billing || service.goodFor) && (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.timeline && (
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Timeline</p>
                  <p className="mt-1 text-sm text-zinc-300">{service.timeline}</p>
                </div>
              )}
              {service.billing && (
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Billing</p>
                  <p className="mt-1 text-sm text-zinc-300">{service.billing}</p>
                </div>
              )}
              {service.goodFor && (
                <div className={`rounded-xl border border-white/10 bg-white/5 p-4 ${!service.timeline && !service.billing ? "" : "sm:col-span-2"}`}>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Good fit for</p>
                  <p className="mt-1 text-sm text-zinc-300">{service.goodFor}</p>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 border-t border-white/10 pt-6">
            <button
              onClick={onContact}
              className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10"
            >
              Get in touch about this
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
