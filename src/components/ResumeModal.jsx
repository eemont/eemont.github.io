import { useEffect } from "react";
import { FaTimes, FaDownload } from "react-icons/fa";

const DOC_ID = "18BPKCWXhiGvv7LqWIu_jk13Zie6PvaGT0QFumCX5Jbc";
const publishedUrl = `https://docs.google.com/document/d/${DOC_ID}/pub?embedded=true`;
const downloadUrl = `https://docs.google.com/document/d/${DOC_ID}/export?format=pdf`;

export default function ResumeModal({ onClose }) {
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full h-dvh sm:h-auto sm:max-h-[90dvh] overflow-hidden bg-zinc-900 shadow-2xl sm:rounded-2xl sm:border sm:border-white/15 sm:max-w-3xl animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white">
            Resume
          </h2>
          <div className="flex items-center gap-2">
            <a
              href={downloadUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-1.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-400 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-500/30"
            >
              <FaDownload className="text-xs" />
              Download PDF
            </a>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <FaTimes className="text-sm" />
            </button>
          </div>
        </div>

        <iframe
          src={publishedUrl}
          title="Resume preview"
          allow="autoplay"
          className="flex-1 min-h-0 w-full block border-0 sm:flex-none sm:aspect-[10.5/11]"
        />
      </div>
    </div>
  );
}
