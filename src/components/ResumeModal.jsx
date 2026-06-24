import { useEffect } from "react";
import { FaTimes, FaDownload } from "react-icons/fa";

const DOC_ID = "18BPKCWXhiGvv7LqWIu_jk13Zie6PvaGT0QFumCX5Jbc";
const previewUrl = `https://docs.google.com/document/d/${DOC_ID}/preview`;
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
      className="fixed inset-0 z-50 flex items-end justify-center p-0 bg-black/80 sm:items-center sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full overflow-hidden rounded-t-2xl border-t border-x border-white/15 bg-zinc-900 shadow-2xl sm:rounded-2xl sm:border sm:max-w-3xl animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold tracking-tight bg-gradient-to-r from-sky-200 via-white to-violet-200 bg-clip-text text-transparent">
            Resume
          </h2>
          <div className="flex items-center gap-2">
            <a
              href={downloadUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-1.5 text-sm font-semibold text-zinc-950 transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10"
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

        {/*
          Padding-top as % of width = responsive aspect-ratio container.
          84% ≈ letter-page ratio scaled to where resume content ends,
          clipping the blank bottom of the Google Docs page.
          The iframe renders at 140% height so the full page loads,
          and overflow-hidden clips everything past the container edge.
        */}
        <div className="relative overflow-hidden rounded-b-2xl" style={{ paddingTop: "125%" }}>
          <iframe
            src={previewUrl}
            title="Resume preview"
            className="absolute inset-0 w-full"
            style={{ height: "140%", display: "block" }}
            allow="autoplay"
          />
        </div>
      </div>
    </div>
  );
}
