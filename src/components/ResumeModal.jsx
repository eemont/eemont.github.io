import { useEffect, useRef, useState } from "react";
import { FaTimes, FaDownload } from "react-icons/fa";

const DOC_ID = "18BPKCWXhiGvv7LqWIu_jk13Zie6PvaGT0QFumCX5Jbc";
const previewUrl = `https://docs.google.com/document/d/${DOC_ID}/preview`;
const downloadUrl = `https://docs.google.com/document/d/${DOC_ID}/export?format=pdf`;

const FRAME_W = 700;
const FRAME_H = Math.round(FRAME_W * 11 / 9.5); // 811 — matches 9.5/11 ratio

export default function ResumeModal({ onClose }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(null);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    const measure = () => {
      if (!containerRef.current) return;
      setScale(containerRef.current.offsetWidth / FRAME_W);
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      ro.disconnect();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 sm:items-center sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full h-dvh sm:h-auto sm:max-h-[90dvh] overflow-hidden bg-zinc-900 shadow-2xl sm:rounded-2xl sm:border sm:border-white/15 sm:max-w-3xl animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
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

        {/* Mobile: full-screen iframe, Google Docs handles touch scroll/zoom */}
        <iframe
          src={previewUrl}
          title="Resume preview"
          allow="autoplay"
          className="flex-1 min-h-0 w-full block border-0 sm:hidden"
        />

        {/* Desktop: scaled iframe preview */}
        <div ref={containerRef} className="hidden sm:block w-full overflow-hidden rounded-b-2xl">
          {scale !== null && (() => {
            const dpr = window.devicePixelRatio || 1;
            return (
              <div style={{ width: FRAME_W * scale, height: FRAME_H * scale, position: "relative", overflow: "hidden" }}>
                <iframe
                  src={previewUrl}
                  title="Resume preview"
                  allow="autoplay"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: FRAME_W * dpr,
                    height: FRAME_H * dpr,
                    transform: `scale(${scale / dpr})`,
                    transformOrigin: "top left",
                    display: "block",
                    border: "none",
                  }}
                />
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
